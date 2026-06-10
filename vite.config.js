import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // Custom domains serve from the site root, not /HouseInventory/.
  // Override with VITE_BASE_PATH=/HouseInventory/ for username.github.io/HouseInventory/.
  base: process.env.VITE_BASE_PATH || '/',
})
