/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_DEFAULT_API: string;
  readonly VITE_APP_ACCESS_TOKEN: string;
  readonly VITE_APP_THEME_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
