import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
const baseUrl = process.env.JOHAN_BASE_URL || 'http://127.0.0.1:5173'
const browser = await chromium.launch({channel:'msedge',headless:true})
const page = await browser.newPage()
const errors=[]
page.on('pageerror',e=>errors.push(e.message))
await mkdir('design/qa',{recursive:true})
const result=[]
for(const width of [1440,768,390,320]){
 await page.setViewportSize({width,height:width===1440?1080:900})
 for(const route of ['','sobre-mi','galeria','blog','contacto']){
  await page.goto(`${baseUrl}/${route}`,{waitUntil:'load',timeout:15000}).catch(()=>{})
  await page.evaluate(()=>document.fonts.ready)
  await page.locator('h1').waitFor()
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}window.scrollTo(0,0)})
  await page.waitForTimeout(500)
  const data=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.querySelectorAll('img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),h1:document.querySelector('h1').textContent}))
  result.push({width,route:route||'inicio',...data})
  if(width!==320)await page.screenshot({path:`design/qa/${route||'inicio'}-${width}.png`,fullPage:true})
 }
}
await page.setViewportSize({width:1440,height:1000})
await page.goto(`${baseUrl}/galeria`)
for(const category of ['Yo','Mascotas','Deporte','Ciencia']){
 await page.getByRole('button',{name:category,exact:true}).click()
 await page.waitForTimeout(400)
 if(await page.locator('.gallery-tile').count()!==2)throw new Error('Filter '+category)
 if(await page.locator('.gallery-tile .photo-label').allTextContents().then(t=>t.some(v=>v!==category)))throw new Error('Wrong category')
}
await page.locator('.gallery-tile').first().click()
await page.getByRole('dialog').waitFor({state:'visible'})
await page.keyboard.press('ArrowRight')
if(!(await page.locator('figcaption').textContent()).includes('2 / 2'))throw new Error('Lightbox next')
await page.keyboard.press('Escape')
await page.getByRole('dialog').waitFor({state:'detached'})
await page.setViewportSize({width:390,height:844})
await page.getByRole('button',{name:'Abrir menú'}).click()
await page.getByRole('link',{name:'Contacto',exact:true}).click()
await page.waitForTimeout(500)
if(!page.url().endsWith('/contacto'))throw new Error('Mobile navigation')
if(await page.getByRole('button',{name:'Abrir menú'}).getAttribute('aria-expanded')!=='false')throw new Error('Menu did not close')
const embed=await page.locator('iframe').getAttribute('src')
if(!embed.includes('6XryTdZbjMdfFEURVZdphG'))throw new Error('Spotify embed')
await page.emulateMedia({reducedMotion:'reduce'})
await page.goto(`${baseUrl}/`)
await page.waitForTimeout(400)
if(await page.locator('h1').isVisible()!==true)throw new Error('Reduced motion content')
await writeFile('design/qa/results.json',JSON.stringify({result,errors,interactions:'filters, lightbox keyboard/Escape, mobile navigation, Spotify source, reduced motion passed'},null,2))
console.log(JSON.stringify({result,errors},null,2))
await browser.close()
if(errors.length||result.some(r=>r.overflow||r.brokenImages.length))process.exitCode=1
