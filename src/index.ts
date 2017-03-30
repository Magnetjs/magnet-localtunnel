import { Module } from 'magnet-core/module'
import * as localtunnel from 'localtunnel'
import { fromCallback } from 'bluebird'

export default class MagnetLocaltunnel extends Module {
  get moduleName () { return 'localtunnel' }
  get defaultConfig () { return __dirname }

  async setup () {
    let tunnel
    await fromCallback((cb) => {
      tunnel = localtunnel(this.config.port, this.config, cb)
    })
    this.insert(tunnel)

    this.log.info(`Localtunnel exposed port ${this.config.port} to ${tunnel.url}`);

    tunnel.on('error', (...args) => {
      this.log.error(args)
    })

    tunnel.on('close', (...args) => {
      this.log.error(args)
    })
  }

  async teardown () {
    this.app.localtunnel.close()
  }
}
