/// <reference types="vite/client" />

/** Переменные из .env с префиксом VITE_ доступны в клиенте через import.meta.env */
interface ImportMetaEnv {
  /** Ключ Web3Forms (https://web3forms.com). Файл .env не коммитим. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
