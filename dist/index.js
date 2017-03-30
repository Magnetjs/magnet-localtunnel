"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("magnet-core/module");
const localtunnel = require("localtunnel");
class MagnetLocaltunnel extends module_1.Module {
    get moduleName() { return 'localtunnel'; }
    get defaultConfig() { return __dirname; }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.prepareConfig('localtunnel', defaultConfig);
            let tunnel;
            yield fromCallback(function (cb) {
                tunnel = localtunnel(config.port, config, cb);
            });
            this.insert(tunnel);
            this.log.info(`Localtunnel exposed port ${config.port} to ${tunnel.url}`);
            tunnel.on('error', (...args) => {
                this.log.error(args);
            });
            tunnel.on('close', (...args) => {
                this.log.error(args);
            });
        });
    }
    teardown() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.localtunnel.close();
        });
    }
}
exports.default = MagnetLocaltunnel;
//# sourceMappingURL=index.js.map