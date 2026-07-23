# TSR — BG Noir GitHub Pages сайт

Готов статичен сайт за **The Social Republic Roleplay**. Не изисква база данни, платен хостинг или допълнителна инсталация.

## 1. Смени линковете и IP адреса

Отвори `index.html` с Visual Studio Code или Notepad++.

Натисни `Ctrl + H` и смени:

- `https://discord.gg/CHANGE-ME` → твоя Discord invite линк
- `fivem://connect/CHANGE-ME` → например `fivem://connect/123.123.123.123:30120`
- `data-ip="CHANGE-ME"` → например `data-ip="123.123.123.123:30120"`
- TikTok и YouTube линковете във footer секцията

## 2. Качи сайта в GitHub

1. Влез в https://github.com
2. Натисни **New repository**
3. Име: `tsr-website`
4. Избери **Public**
5. Натисни **Create repository**
6. Натисни **uploading an existing file**
7. Качи всички файлове и папката `assets`
8. Натисни **Commit changes**

## 3. Активирай GitHub Pages

1. В repository отвори **Settings**
2. От лявото меню избери **Pages**
3. Под **Build and deployment** избери:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. Натисни **Save**

След публикуването адресът ще бъде подобен на:

`https://ТВОЕТО-ИМЕ.github.io/tsr-website/`

## Структура

- `index.html` — съдържанието
- `style.css` — дизайнът
- `script.js` — меню, анимации и копиране на IP
- `assets/tsr-mark.svg` — TSR логото
- `assets/signature.svg` — декоративен подпис

## Промяна на текстове

Всички секции са директно в `index.html`. Можеш да смениш заглавията и описанията без да пипаш CSS или JavaScript.
