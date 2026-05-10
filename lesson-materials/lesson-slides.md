---
marp: true
theme: default
paginate: true
size: 16:9
---

# Первая страница на React
## Основные этапы: от установки до деплоя

---

# План урока

1. Установить инструменты
2. Создать и запустить проект
3. Собрать страницу из компонентов
4. Отправить код на GitHub
5. Опубликовать сайт через GitHub Pages

---

# Шаг 1. Установка приложений

Установить:

- Cursor — https://cursor.com
- Node.js LTS — https://nodejs.org
- Git — https://git-scm.com/download/win

Проверка в терминале:

```bash
node -v
npm -v
git --version
```

---

# Шаг 2. Создание React-проекта

```bash
cd C:\js\react\bCard
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

Запуск проекта:

```bash
npm run dev
```

Открыть адрес из терминала (`http://localhost:5173` или другой порт).

---

# Шаг 3. Структура проекта

- `src` — основной код
- `public` — картинки и статические файлы
- `package.json` — скрипты и зависимости

Важно:

- npm-команды работают только в папке с `package.json`

---

# Шаг 4. Компоненты страницы

Создать 3 компонента:

- `FullName`
- `ProfilePhoto`
- `AboutMe`

Подключить в `App.tsx`:

```tsx
<FullName />
<section className="content-row">
  <ProfilePhoto />
  <AboutMe />
</section>
```

---

# Шаг 5. CSS Modules

Для каждого компонента создать свой файл стилей:

- `FullName.module.css`
- `ProfilePhoto.module.css`
- `AboutMe.module.css`

Подключение:

```tsx
import styles from './ProfilePhoto.module.css'
```

---

# Шаг 6. GitHub Pages: важные настройки

`vite.config.ts`:

```ts
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { host: 'localhost', port: 3000, open: true }
})
```

`package.json` (scripts):

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

---

# Шаг 7. Команды Git (от init до push)

```bash
cd C:\js\react\bCard
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<username>/<repo>.git
git branch -M main
git push -u origin main
```

---

# Шаг 8. Deploy на GitHub Pages

```bash
cd C:\js\react\bCard\my-app
npm install -D gh-pages
npm run deploy
```

В GitHub:

`Settings -> Pages -> Branch gh-pages -> Folder / (root)`

---

# Быстрый чек-лист

- [ ] `npm run dev` запускается
- [ ] Страница состоит из 3 компонентов
- [ ] Код отправлен в `main`
- [ ] Выполнен `npm run deploy`
- [ ] Сайт открывается по ссылке GitHub Pages

---

# Частые ошибки

- `ENOENT package.json` -> перейти в `my-app`
- `src refspec mai` -> опечатка, нужно `main`
- нет картинки на Pages -> использовать `import.meta.env.BASE_URL`
- не обновился сайт -> заново `npm run deploy` + `Ctrl + F5`
