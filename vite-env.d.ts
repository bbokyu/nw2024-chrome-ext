/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXAMPLE: string;
  readonly GEMINI_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
