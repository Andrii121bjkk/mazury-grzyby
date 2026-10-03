# Grzyby Mazury — готовий вебпроєкт

Мобільна PWA-карта для Пущі Піської. Орієнтовна зона: Nadleśnictwo Pisz, Maskulińskie та Spychowo.

## Що всередині
- Leaflet + OpenStreetMap.
- Реальні полігони лісових виділів з офіційного BDL OGC API.
- Запити BDL обмежуються поточним вікном карти з пагінацією.
- Шість грибів і чотири режими погодних умов.
- Погодні дані та прогноз до 10 днів від Open-Meteo.
- Модельна оцінка виділів, рейтинг, геолокація та Google Maps.
- Шари Geoportal, тимчасові заборони, пожежна небезпека та туристичні об’єкти.
- PWA для повторного відкриття застосунку.
- Cloudflare Pages Functions для BDL, Open-Meteo та OSRM.

## Важливо про оцінку
Це модельна підказка, а не ботанічна гарантія. Ваги моделі не перевірені на польових спостереженнях. Перед поїздкою перевіряй місцеві заборони та правила доступу. Лісова чи пожежна дорога не означає, що приватним авто нею можна їхати.

## Публікація на Cloudflare Pages
Потрібен Cloudflare Pages. Команди для публікації з кореня проєкту:

    npx wrangler login
    npx wrangler pages project create mazury-grzyby
    npx wrangler pages deploy public --project-name mazury-grzyby

Каталог functions у корені містить серверні маршрути. У Cloudflare Pages для них увімкнено роздачу через /api.

## Джерела
- BDL OGC API: https://ogcapi.bdl.lasy.gov.pl
- Каталог OGC BDL: https://www9.bdl.lasy.gov.pl/portal/uslugi-ogc
- Geoportal: https://www.geoportal.gov.pl/
- Open-Meteo: https://open-meteo.com/
- OSRM: https://project-osrm.org/
- OpenStreetMap: https://www.openstreetmap.org/
