# Deploy

## Cloudflare Pages
1. `npx wrangler login`
2. `npx wrangler pages project create mazury-grzyby`
3. `npx wrangler pages deploy public --project-name mazury-grzyby`
4. Відкрий URL https://mazury-grzyby.pages.dev. Cloudflare покаже точну адресу після першої публікації.

## Домен
У Cloudflare Pages додай власний домен.

## GitHub
Під час підключення репозиторію до Cloudflare Pages команда збирання не потрібна, каталог публікації — public.
