/**
 * Конфигурация Vite: сборка, dev-сервер, базовый путь для статических ресурсов.
 * @see https://vite.dev/config/
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  /**
   * base: './' — относительные пути к бандлу и ассетам.
   * Нужно для GitHub Pages, когда сайт открывается не с корня домена, а из подпапки репозитория.
   */
  base: './',
  /** Плагин React: JSX, Fast Refresh, обработка .tsx/.jsx. */
  plugins: [react()],
  server: {
    /** host по умолчанию localhost — слушаем только локальную машину. */
    host: 'localhost',
    /** Порт dev-сервера (в терминале будет http://localhost:3000). */
    port: 3000,
    /** open: true — при npm run dev браузер откроется автоматически. */
    open: true,
  },
})
