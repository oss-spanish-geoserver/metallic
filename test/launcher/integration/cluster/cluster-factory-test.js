import assert from 'assert'
import LoggerFactory from '../../../../src/logger'
import MetricsFactory from '../../../../src/metrics'
import HttpServerFactory from '../../../../src/app'
import { RunnerInterface } from '../../../../src/interfaces'
import ClusterFactory from '../../../../src/launcher/cluster'

describe('cluster-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create()
    const metrics = MetricsFactory.create({ logger })
    const httpServer = HttpServerFactory.create({ logger, metrics })
    const cluster = ClusterFactory.create({ httpServer, metrics, logger })

    assert.ok(cluster instanceof RunnerInterface)
  })
})
