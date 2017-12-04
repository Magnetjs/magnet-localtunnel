import { Module } from 'magnet-core/module'
import * as localtunnel from 'localtunnel'
import { fromCallback } from 'bluebird'

export default class MagnetLocaltunnel extends Module {
  init () {
    this.moduleName = 'localtunnel'
    this.defaultConfig = __dirname
  }

  async setup () {
    const tunnel = await fromCallback((cb) =>
      localtunnel(this.config.port, this.config, cb)
    )
    this.insert(tunnel)

    this.log.info(`Localtunnel exposed port ${this.config.port} to ${tunnel.url}`);

    tunnel.on('error', (...args) => {
      this.log.error(args)
    })

    tunnel.on('close', (...args) => {
      this.log.info(args)
    })
  }

  async teardown () {
    this.app.localtunnel.close()
  }
}
