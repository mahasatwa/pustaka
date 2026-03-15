const fs = require('fs');
const path = require('path');

const jsonDir = path.join(__dirname, '..', 'src', 'assets', 'json', 'books');
const imgDir = path.join(__dirname, '..', 'src', 'assets', 'img', 'books');

function slugify(s){
  return s.toString().toLowerCase().normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s-_.]/g,'')
    .trim()
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-')
    .replace(/^[-_\.]+|[-_\.]+$/g,'');
}

function cleanDescription(desc){
  if(!desc) return '';
  let s = String(desc).trim();
  // Remove leading punctuation/IDs like "-09-211-EBOOK ..."
  s = s.replace(/^[-\s\._"']+/, '');
  s = s.replace(/^\d{1,3}[-_\s]*[A-Z0-9\-_.]*\bEBOOK\b[:\s-]*/i, '');
  // Remove repeating words like "Publikasi terbaru from..."
  s = s.replace(/Publikasi terbaru.*$/i, '').trim();
  // Collapse whitespace
  s = s.replace(/\s{2,}/g,' ');
  // Ensure starts uppercase and ends with period
  s = s.charAt(0).toUpperCase() + s.slice(1);
  if(!/[.!?]$/.test(s)) s = s + '.';
  return s;
}

let stats = {files:0,updated:0,imagesRenamed:0,imagesMissing:0};
const files = fs.readdirSync(jsonDir).filter(f=>f.endsWith('.json'));
for(const f of files){
  stats.files++;
  const p = path.join(jsonDir,f);
  let obj;
  try{ obj = JSON.parse(fs.readFileSync(p,'utf8')); }catch(e){ console.warn('skip',f,'not-json'); continue; }
  let changed = false;

  // Clean description
  const cleaned = cleanDescription(obj.description || obj.desc || '');
  if(cleaned && cleaned !== (obj.description||'')){
    obj.description = cleaned;
    changed = true;
  }

  // Normalize image field using title-based slug
  if(obj.image){
    const ext = path.extname(obj.image) || '.jpg';
    const newImage = slugify(obj.title || path.basename(f, '.json')) + ext.toLowerCase();
    if(obj.image !== newImage){
      const oldImgPath = path.join(imgDir, obj.image);
      const newImgPath = path.join(imgDir, newImage);
      if(fs.existsSync(oldImgPath)){
        try{
          // if target exists, don't overwrite, instead append numeric
          if(fs.existsSync(newImgPath) && path.resolve(oldImgPath) !== path.resolve(newImgPath)){
            // keep newImage but do not overwrite file
            console.log('Target image exists, keeping existing:', newImage);
          } else {
            fs.renameSync(oldImgPath, newImgPath);
            stats.imagesRenamed++;
            console.log('Renamed image', obj.image, '->', newImage);
          }
        }catch(e){ console.warn('Could not rename image', oldImgPath, e.message); }
      } else {
        // try lowercase/other variants
        const alt = obj.image.toLowerCase();
        const altPath = path.join(imgDir, alt);
        if(fs.existsSync(altPath)){
          try{ fs.renameSync(altPath, path.join(imgDir,newImage)); stats.imagesRenamed++; console.log('Renamed alt image', alt, '->', newImage);}catch(e){/*ignore*/}
        } else {
          stats.imagesMissing++;
          console.log('Image missing for', f, ':', obj.image, '-> will set to', newImage);
        }
      }
      obj.image = newImage;
      changed = true;
    }
  } else {
    // If no image, create a default image name from title
    const ext = '.jpg';
    const newImage = slugify(obj.title || path.basename(f, '.json')) + ext;
    obj.image = newImage; changed = true;
    stats.imagesMissing++;
  }

  if(changed){
    fs.writeFileSync(p, JSON.stringify(obj, null, 4), 'utf8');
    stats.updated++;
    console.log('Updated', f);
  }
}

console.log('Done:', stats);
