/**
 * Точка входа в клиентское React-приложение.
 * index.html содержит <div id="root"></div> — сюда монтируется дерево компонентов.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// getElementById('root')! — восклицательный знак: мы утверждаем TypeScript, что элемент есть.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*
      StrictMode в development включает дополнительные проверки (устаревшие API,
      побочные эффекты). На production-сборку почти не влияет по размеру бандла.
    */}
    <App />
  </StrictMode>,
)
