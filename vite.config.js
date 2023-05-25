import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: [
                'vue',
                {
                    'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
                },
                'vue-router',
                'pinia'
            ],
            resolvers: [NaiveUiResolver()],
            dts: 'src/auto-imports.d.ts'
        }),
        Components({
            resolvers: [NaiveUiResolver()],
            dts: 'src/components.d.ts'
        })

    ],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, './src')
            }
        ]
    },
    define: {
        'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
        __DEV__: process.env.NODE_ENV !== 'production'
    }
})
