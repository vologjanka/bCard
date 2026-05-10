# Памятка ученика: React + GitHub Pages

## 1) Быстрый план урока

1. Установить `Cursor`, `Node.js`, `Git`
2. Создать проект на React (Vite)
3. Сделать 3 компонента: `FullName`, `ProfilePhoto`, `AboutMe`
4. Подключить CSS Modules
5. Отправить в GitHub
6. Опубликовать через GitHub Pages

---

## 2) Команды запуска проекта

```bash
cd C:\js\react\bCard\my-app
npm install
npm run dev
```

Если ошибка `ENOENT package.json` -> вы не в папке `my-app`.

---

## 3) Что важно помнить про package.json

- `scripts` — команды проекта
- `dependencies` — что нужно сайту для работы
- `devDependencies` — что нужно разработчику

Минимальный набор скриптов:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

---

## 4) Базовый шаблон компонента

```tsx
import styles from './Component.module.css'

function Component() {
  return <section className={styles.box}>Контент</section>
}

export default Component
```

---

## 5) Памятка по CSS Modules

- Файл называется `ИмяКомпонента.module.css`
- Подключение: `import styles from './File.module.css'`
- Использование: `className={styles.className}`

Полезные свойства:

- `padding` — внутренний отступ
- `margin` — внешний отступ
- `border` — рамка
- `border-radius` — скругление
- `box-shadow` — тень
- `display: flex` — удобная раскладка
- `@media` — адаптив для телефона

---

## 6) Git: сохранить изменения

```bash
cd C:\js\react\bCard
git add .
git commit -m "Update project"
git push origin main
```

---

## 7) Deploy на GitHub Pages

```bash
cd C:\js\react\bCard\my-app
npm install -D gh-pages
npm run deploy
```

GitHub -> `Settings` -> `Pages` -> Branch `gh-pages` -> Folder `(root)`.

---

## 8) Частые ошибки

- `npm ERR! enoent ... package.json`  
  -> Перейти в папку проекта (`my-app`).

- `src refspec mai does not match any`  
  -> Опечатка, нужно `main`.

- Картинка не видна на GitHub Pages  
  -> Используйте путь через `import.meta.env.BASE_URL`.

---

## 9) Домашка без компьютера

1. Нарисовать схему компонентов страницы.
2. Выучить 8 команд из памятки.
3. Подготовить финальный текст "Обо мне".
4. Подобрать 3 цвета для дизайна страницы.
