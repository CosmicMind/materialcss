/**
 * BSD 3-Clause License
 *
 * Copyright © 2023, Daniel Jonathan <daniel at cosmicmind dot com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import {
	URL,
	fileURLToPath,
} from 'node:url'

import {
	PluginOption,
	LibraryFormats,
	defineConfig,
} from 'vite'

import { viteStaticCopy } from 'vite-plugin-static-copy'

const name = process.env.npm_package_name
const srcDir = 'src'
const entry = `${srcDir}/index.ts`
const fileName = 'lib-[format]'
const formats: LibraryFormats[] = [ 'es', 'cjs' ]
const emptyOutDir = true
const minify = false

const alias = {
	'@': fileURLToPath(new URL(srcDir, import.meta.url)),
}

const staticTargets = [
	{
		src: `${srcDir}/lib/*`,
		dest: './sass/lib',
	},
	{
		src: `${srcDir}/themes/*`,
		dest: './sass/themes',
	},
	{
		src: `${srcDir}/_core.sass`,
		dest: './sass',
	}
]

const plugins = [
	viteStaticCopy({
		targets: staticTargets,
	})
] as PluginOption[]

export default defineConfig(() => ({
	resolve: {
		alias,
	},
	plugins,
	build: {
		minify,
		emptyOutDir,
		lib: {
			name,
			entry,
			formats,
			fileName,
		},
		rollupOptions: {
			output: {
				assetFileNames: (info): string => {
					if ('style.css' === info.name) {
						return 'material.css'
					}
					return info.name || 'build-filename-undefined'
				},
			},
		},
	},
}))
