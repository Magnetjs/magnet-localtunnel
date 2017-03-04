import { Module } from 'magnet-core/module'
import * as localtunnel from 'localtunnel'
import { fromCallback } from 'bluebird'

import defaultConfig from './config/localtunnel'

export default class Localtunnel extends Module {
  async setup () {
    const config = this.prepareConfig('localtunnel', defaultConfig)

    let tunnel
    await fromCallback(function (cb) {
      tunnel = localtunnel(config.port, config, cb)
    })

    this.log.info(`Localtunnel exposed port ${config.port} to ${tunnel.url}`);

    tunnel.on('error', (...args) => {
      this.log.error(args)
    })

    tunnel.on('close', (...args) => {
      this.log.error(args)
    })
  }
}
