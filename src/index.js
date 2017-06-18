import config from './config'
import MetricsFactory from 'metallic-metrics'
import LoggerFactory from 'metallic-logger'
import HttpServerFactory from 'metallic-app'
import LauncherFactory from 'metallic-launcher'
export { LEADER, SERVER } from 'metallic-launcher'

export default class Metallic {
  constructor (clientOptions = {}) {
    const options = config(clientOptions)

    const logger = this._logger = LoggerFactory.create({
      options: {
        name: options.name,
        extra: {
          role: options.cluster.role
        },
        ...options.logger
      }
    })

    const metrics = this._metrics = MetricsFactory.create({
      logger,
      options: {
        prefix: `${options.name}:${options.cluster.role}`,
        ...options.metrics
      }
    })

    const httpServer = this._httpServer = HttpServerFactory.create({
      metrics,
      logger,
      options: {
        port: options.port
      }
    })

    this._launcher = LauncherFactory.create({
      httpServer,
      metrics,
      logger,
      options: {
        port: options.port,
        ...options.cluster
      }
    })
  }

  get role () {
    return this._launcher.role
  }

  get app () {
    return this._httpServer.provider
  }

  get logger () {
    return this._logger.provider
  }

  get metrics () {
    return this._metrics.provider
  }

  get start () {
    return this._launcher.run.bind(this._launcher)
  }

  get stop () {
    return this._launcher.close.bind(this._launcher)
  }

  get exit () {
    return this._launcher.exit.bind(this._launcher)
  }
}
