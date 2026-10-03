# Публікація Grzyby Warszawa

Сайт уже працює на Cloudflare Pages з HTTPS:

https://mazury-grzyby.pages.dev/

Cloudflare Pages автоматично публікує зміни з гілки [main](https://github.com/Andrii121bjkk/mazury-grzyby) репозиторію. Команда збірки не потрібна; папка сайту — `public`, а серверні запити до даних лісів — у `functions/api`.

Щоб оновити сайт, збережи зміни в гілці `main`. Після автоматичної публікації сайт доступний за тією самою адресою з HTTPS.

У Cloudflare Pages можна під’єднати власний домен, якщо він буде потрібен.
