import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths({ loose: true })],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@styles/index";\n`
      }
    }
  }
})
