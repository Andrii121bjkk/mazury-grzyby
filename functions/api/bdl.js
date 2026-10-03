const BASE='https://ogcapi.bdl.lasy.gov.pl/collections';
const COLLS=['RDLP_Warszawa_wydzielenia','RDLP_Radom_wydzielenia','RDLP_Lodz_wydzielenia','RDLP_Lublin_wydzielenia','RDLP_Torun_wydzielenia','RDLP_Olsztyn_wydzielenia','RDLP_Bialystok_wydzielenia'];
const H=new Headers({'content-type':'application/json; charset=utf-8','access-control-allow-origin':'*','cache-control':'public, max-age=300, s-maxage=900'});
function out(x,status=200){return new Response(JSON.stringify(x),{status,headers:H})}
async function page(collection,bbox,offset,limit){
  const u=`${BASE}/${collection}/items?f=json&limit=${limit}&offset=${offset}&bbox=${encodeURIComponent(bbox)}`;
  const r=await fetch(u,{headers:{accept:'application/geo+json,application/json'}}); if(!r.ok)throw new Error(`${collection}: HTTP ${r.status}`); return r.json();
}
export async function onRequestGet({request}){
  try{
    const u=new URL(request.url), bbox=u.searchParams.get('bbox'); if(!bbox)return out({error:'bbox is required'},400);
    const max=Math.min(Math.max(Number(u.searchParams.get('max')||1500),250),1500);
    const all=[]; const seen=new Set();
    // BDL defaults to 20 features. We explicitly page, with a cap so a very wide viewport stays safe.
    for(const c of COLLS){
      let offset=0, total=0;
      while(total<max){
        const limit=Math.min(500,max-total); const j=await page(c,bbox,offset,limit); const feats=j.features||[];
        for(const f of feats){const p=f.properties||{};const key=`${f.id}|${p.adr_for}|${p.nazwa}`;if(!seen.has(key)){seen.add(key);all.push(f)}}
        total+=feats.length; offset+=feats.length; if(feats.length===0||feats.length<limit)break;
      }
    }
    return out({type:'FeatureCollection',features:all,meta:{count:all.length,collections:COLLS,source:'BDL OGC API'}});
  }catch(e){return out({error:String(e.message||e)},502)}
}
