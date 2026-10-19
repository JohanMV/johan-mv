import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'
const assets = {
 cat:'photo-1514888286974-6c03e2ca1dba', dog:'photo-1552053831-71594a27632d', gym:'photo-1534438327276-14e5300c3a48', basket:'photo-1546519638-68e109498ffc', lab:'photo-1532187863486-abf9dbad1b69', space:'photo-1462331940025-496dfbfc7564', coast:'photo-1473116763249-2faaef81ccda', desk:'photo-1497215728101-856f4ea42174', medical:'photo-1579154204601-01588f351e67', laptop:'photo-1496181133206-80ce9b88a853', server:'photo-1558494949-ef010cbdcc31', code:'photo-1555066931-4365d14bab8c', sunset:'photo-1477959858617-67f85cf4f1df'
}
await sharp('design/originals/johan-original.jpeg').resize({width:1500,withoutEnlargement:true}).webp({quality:88}).toFile('public/images/johan-campus.webp')
await sharp('design/originals/johan-cumple-original.png').resize({width:1100,withoutEnlargement:true}).webp({quality:87}).toFile('public/images/johan-cumple.webp')
await Promise.all(Object.entries(assets).map(async ([name,id])=>{
 const url=`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`
 const res=await fetch(url); if(!res.ok)throw new Error(`${name}: ${res.status}`)
 await sharp(Buffer.from(await res.arrayBuffer())).webp({quality:83}).toFile(`public/images/${name}.webp`)
 console.log(`Saved ${name}`)
}))
for(const [name,color] of Object.entries({instagram:'ffffff',medium:'ffffff',spotify:'1ed760'})){
 const res=await fetch(`https://cdn.simpleicons.org/${name}/${color}`)
 if(res.ok)await writeFile(`public/images/${name}.svg`,await res.text());else console.log(`Icon unavailable: ${name} ${res.status}`)
}
await writeFile('public/image-credits.txt',`RECURSOS VISUALES — JOHAN MV\n\nFotografías originales: Johan MV. Se conservan sin alteración de rasgos.\n\nFotografías temáticas gratuitas de Unsplash, utilizadas como inspiración y portadas provisionales, no como fotografías personales.\nLicencia: https://unsplash.com/license\n\n${Object.entries(assets).map(([name,id])=>`${name}.webp — https://images.unsplash.com/${id}`).join('\n')}\n\nIconos de marcas: Simple Icons, https://simpleicons.org/ (CC0; las marcas pertenecen a sus respectivos titulares).\nTipografías: Anton e Inter, distribuidas mediante Fontsource bajo SIL Open Font License.\n`)
