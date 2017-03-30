import { Module } from 'magnet-core/module'
import * as localtunnel from 'localtunnel'

export default class MagnetLocaltunnel extends Module {
  get moduleName () { return 'localtunnel' }
  get defaultConfig () { return __dirname }

  async setup () {
    const config = this.prepareConfig('localtunnel', defaultConfig)

    let tunnel
    await fromCallback(function (cb) {
      tunnel = localtunnel(config.port, config, cb)
    })
    this.insert(tunnel)

    this.log.info(`Localtunnel exposed port ${config.port} to ${tunnel.url}`);

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
