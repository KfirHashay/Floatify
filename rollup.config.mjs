import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss'; // Add this
import postcssImport from 'postcss-import'; // ✅ Import postcss-import

/** @type {import('rollup').RollupOptions} */
export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
        },
    ],
    watch: {
        clearScreen: false, // Keeps logs readable
    },
    plugins: [
        resolve(),
        commonjs(),
        typescript({ declaration: true, declarationDir: 'dist', rootDir: 'src' }),
        postcss({
            extract: false, // ✅ Embeds CSS directly into the JS bundle
            minimize: true,
            plugins: [postcssImport()], // ✅ Enables @import support
        }),
    ],
    external: ['react', 'react-dom'],
};
