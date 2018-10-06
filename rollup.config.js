import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import nodeResolve from 'rollup-plugin-node-resolve';
import license from 'rollup-plugin-license';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import {uglify} from 'rollup-plugin-uglify';
const outputDir = "dist"
export default {
    input: './src/imageviewer.js',
    exports: 'default',
    external: ['react'],
    output: {
        dir:outputDir,
        file: 'image-viewer-react.js',
        format: 'amd', // 输出 ＵＭＤ格式，各种模块规范通用
        globals: {
            react: 'React'
        }
    },
    plugins: [
        nodeResolve(),
        postcss({
            extract: outputDir + '/index.css',
            plugins: [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')({
                    browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                }),
            ],
            extensions: ['.css'],

        }),
        babel(),
        commonjs(),
        uglify({
            compress: {
                drop_console:true,
                drop_debugger:true
            },
        }),
        license({
            banner: `
            @license image-viewer-react
            @release v<%= pkg.version %>
          `
        }),
        copy({
            'src/static': outputDir+'/static'
        })
    ],
};