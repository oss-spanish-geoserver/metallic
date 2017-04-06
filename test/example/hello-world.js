import { SERVER } from '../../src'
import Example from './example'

export default class HelloWorld extends Example {
  constructor (options) {
    super(options)

    if (this.nitro.role === SERVER) {
      const body = Buffer.from('Hello World\n')
      const message = body.toString('utf8')

      this.nitro.app.use(ctx => {
        ctx.log.info(message)
        ctx.metrics.increment('hello_world')
        ctx.body = body
      })
    }
  }
}
