"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const docker_compose_1 = __importDefault(require("docker-compose"));
exports.default = async () => {
    docker_compose_1.default.down();
};
