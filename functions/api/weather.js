const HDR={'content-type':'application/json; charset=utf-8','access-control-allow-origin':'*','cache-control':'public, max-age=900, s-maxage=1800'};
function out(x,status=200){return new Response(JSON.stringify(x),{status,headers:HDR})}
export async function onRequestGet({request}){
  try{
    const u=new URL(request.url);const lat=u.searchParams.get('lat')||'53.63';const lon=u.searchParams.get('lon')||'21.82';
    const vars=['temperature_2m','relative_humidity_2m','precipitation','soil_temperature_0_to_7cm','soil_moisture_0_to_7cm','wind_speed_10m','cloud_cover'];
    const qs=new URLSearchParams({latitude:lat,longitude:lon,hourly:vars.join(','),current:vars.slice(0,5).join(','),past_days:'7',forecast_days:'10',timezone:'Europe/Warsaw',temperature_unit:'celsius',precipitation_unit:'mm',wind_speed_unit:'kmh',cell_selection:'land'});
    const r=await fetch('https://api.open-meteo.com/v1/forecast?'+qs.toString());if(!r.ok)return out({error:`Open-Meteo HTTP ${r.status}`},502);return out(await r.json());
  }catch(e){return out({error:String(e.message||e)},502)}
}
