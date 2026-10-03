const HDR={'content-type':'application/json; charset=utf-8','access-control-allow-origin':'*','cache-control':'public, max-age=120, s-maxage=300'};
function out(x,status=200){return new Response(JSON.stringify(x),{status,headers:HDR})}
export async function onRequestGet({request}){
  try{
    const u=new URL(request.url),from=u.searchParams.get('from'),to=u.searchParams.get('to');if(!from||!to)return out({error:'from and to are required as lat,lng'},400);
    const [flat,flng]=from.split(',').map(Number),[tlat,tlng]=to.split(',').map(Number);if(![flat,flng,tlat,tlng].every(Number.isFinite))return out({error:'invalid coordinates'},400);
    const url=`https://router.project-osrm.org/route/v1/driving/${flng},${flat};${tlng},${tlat}?overview=full&geometries=geojson&steps=false`;
    const r=await fetch(url);if(!r.ok)return out({error:`OSRM HTTP ${r.status}`},502);const j=await r.json();if(j.code!=='Ok')return out({error:j.message||'OSRM route error'},502);return out(j);
  }catch(e){return out({error:String(e.message||e)},502)}
}
