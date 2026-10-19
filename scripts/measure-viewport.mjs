import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const routes = ['/', '/sobre-mi', '/galeria', '/blog', '/contacto']
const viewports = [[1920, 1080], [1920, 936], [1600, 900], [1600, 756], [1536, 864], [1536, 720], [1366, 768], [1366, 624], [1280, 720], [1280, 576]]
const results = []
const failures = []
await mkdir('design/viewport-qa', { recursive: true })
for (const [width, height] of viewports) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' })
  for (const route of routes) {
    await page.goto(`${process.env.JOHAN_BASE_URL || 'http://127.0.0.1:5174'}${route}`, { waitUntil: 'domcontentloaded' })
    await page.locator('h1').waitFor()
    await page.evaluate(() => document.fonts.ready)
    const metrics = await page.evaluate(() => {
      const frame = document.querySelector('.site-frame').getBoundingClientRect()
      const main = document.querySelector('main').getBoundingClientRect()
      return {
        viewport: `${innerWidth}x${innerHeight}`,
        scrollHeight: document.documentElement.scrollHeight,
        scrollWidth: document.documentElement.scrollWidth,
        frameTop: Math.round(frame.top),
        frameBottom: Math.round(frame.bottom),
        frameHeight: Math.round(frame.height),
        mainHeight: Math.round(main.height),
        imagesBroken: [...document.images].filter(image => image.complete && image.naturalWidth === 0).length,
      }
    })
    const item = { route, ...metrics }
    results.push(item)
    const safetyScroll = height < 720 && (route === '/sobre-mi' || route === '/blog') || width === 1280 && (route === '/sobre-mi' || route === '/blog')
    if (metrics.scrollWidth > width || metrics.imagesBroken || !safetyScroll && metrics.scrollHeight > height || !safetyScroll && (metrics.frameTop < 11 || metrics.frameBottom > height - 11)) failures.push(item)
    if (width === 1920 && height === 936 || width === 1536 && height === 720 || width === 1366 && height === 624 && safetyScroll) {
      await page.screenshot({ path: `design/viewport-qa/${route.slice(1) || 'inicio'}-${width}x${height}.png`, fullPage: safetyScroll })
    }
  }
  await page.close()
}
for (const [width, height] of viewports) {
  const matching = results.filter(item => item.viewport === `${width}x${height}` && item.scrollHeight <= height)
  if (matching.length === routes.length && new Set(matching.map(item => `${item.frameTop}:${item.frameHeight}`)).size !== 1) {
    failures.push({ viewport: `${width}x${height}`, reason: 'Desktop frames do not share the same position and height', frames: matching.map(({ route, frameTop, frameHeight }) => ({ route, frameTop, frameHeight })) })
  }
}
await browser.close()
await writeFile('design/viewport-qa/results.json', JSON.stringify({ results, failures }, null, 2))
console.log(`Checked ${results.length} viewport/page combinations. Failures: ${failures.length}`)
if (failures.length) { console.log(failures); process.exitCode = 1 }

