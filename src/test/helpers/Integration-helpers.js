"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../src/app"));
class IntegrationHelpers {
    static async getApp() {
        if (this.appInstance) {
            return this.appInstance;
        }
        this.appInstance = app_1.default;
        return this.appInstance;
    }
}
exports.default = IntegrationHelpers;
