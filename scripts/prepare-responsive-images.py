"""Generate bundled image dimensions and WebP variants. Requires Python Pillow."""
from pathlib import Path
import json
from PIL import Image
root=Path(__file__).resolve().parents[1]; manifest={}
for folder in ['screens','press-images','logos']:
 for p in sorted((root/'public'/folder).glob('*')):
  if not p.is_file(): continue
  try:
   im=Image.open(p); w,h=im.size
  except Exception: continue
  entry={'width':w,'height':h}
  if folder!='logos':
   variants=[]
   for size in [480,960,1440]:
    width=min(size,w)
    if any(v['width']==width for v in variants): continue
    target=root/'public'/'optimized'/folder/(p.name+f'.{width}.webp'); target.parent.mkdir(parents=True,exist_ok=True)
    im.convert('RGB').resize((width,round(h*width/w)),Image.Resampling.LANCZOS).save(target,'WEBP',quality=82)
    variants.append({'width':width,'src':'/'+str(target.relative_to(root/'public'))})
   entry['variants']=variants
  manifest['/'+folder+'/'+p.name]=entry
(root/'src/data/image-metadata.json').write_text(json.dumps(manifest,indent=2)+'\n')
