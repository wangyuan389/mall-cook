/*
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-07 18:15:13
 * @LastEditors: June
 * @LastEditTime: 2023-03-10 18:19:33
 */
import { defineConfig } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
// import { viteExternalsPlugin } from 'vite-plugin-externals'
import { resolve } from 'path'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig=>{
    return {
      base: './',
      publicDir: resolve(__dirname, './dist'),
      optimizeDeps: {
        include: ['faim > qrcode', 'faim > sweetalert2', 'faim > upng-js'],
      },
      plugins: [
        createVuePlugin(),
        /* viteExternalsPlugin({
          'element-ui': 'ELEMENT',
          vue: 'Vue',
        }) */
      ],
      css: {
        preprocessorOptions: {
          scss: {
              additionalData: '@import "@render/scss/base.scss";',
          },
        },
      },
      resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
        alias: {
          '@render': resolve(__dirname, 'src/render'),
          '@': resolve(__dirname, 'src/render')
        },
      },
      build: {
        rollupOptions: {
          external: [
            'vue',
            'element-ui',
          ],
          output: {
            globals: {
              'vue': 'Vue',
              'element-ui': 'ELEMENT',
            },
          },
        },
      },
    }
})
