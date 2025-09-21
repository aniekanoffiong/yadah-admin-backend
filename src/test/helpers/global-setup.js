"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_port_reachable_1 = __importDefault(require("is-port-reachable"));
const path_1 = __importDefault(require("path"));
const docker_compose_1 = __importDefault(require("docker-compose"));
exports.default = async () => {
    console.time('global-setup');
    const isDBReachable = await (0, is_port_reachable_1.default)(27019, { host: 'localhost' });
    if (!isDBReachable) {
        await docker_compose_1.default.upAll({
            cwd: path_1.default.join(__dirname),
            log: true,
        });
    }
    console.timeEnd('global-setup');
};
