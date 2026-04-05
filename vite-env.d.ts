/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYPAL_CLIENT_ID: string
  readonly VITE_PAYPAL_SECRET: string
  readonly VITE_DEFAULT_CURRENCY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
