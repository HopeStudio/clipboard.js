import { readFileSync } from 'fs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

const pkg = JSON.parse( readFileSync( 'package.json', 'utf-8' ) );

let banner = `/*
 ${pkg.name} v${pkg.version}
 ${new Date()}
 https://github.com/yangfch3/clipboard.js
 Released under the MIT License.
 */`;

export default {
    entry: 'src/index.js',
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: 'es2015-rollup',
            babelrc: false
        }),
        replace({
            '<@VERSION@>': pkg.version,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ],
    external: [
    ],
    banner: banner,
    sourceMap: false,
    moduleName: 'Clipboard',
    indent: true,
    targets: [
        { dest: 'dist/clipboard.js', format: 'umd' },
        { dest: 'dist/clipboard.common.js', format: 'cjs' }
    ]
};
