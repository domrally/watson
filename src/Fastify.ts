import fastifyStatic from '@fastify/static'
import { log } from 'console'
import { config } from 'dotenv'
import fastify from 'fastify'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

config()

/**
 *
 */
export const Fastify = fastify()
log('Server is initializing')

//
const { env } = process,
	__filename = fileURLToPath(import.meta.url),
	__dirname = dirname(__filename),
	folder = env['PUBLIC'] || 'public',
	root = join(__dirname, '..', folder)
log('initialized variables')

//
await Fastify.register(fastifyStatic, { root, prefix: `/${folder}/` })
log(`Serving static files from: ${folder}`)

//
await Fastify.ready()
log('Server is ready')

//
const port = parseInt(env['PORT'] || '3000')
await Fastify.listen({ port })
log(`Server is listening on port: ${port}`)
