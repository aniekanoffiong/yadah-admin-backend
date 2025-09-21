import redis from "../../external/redis.client";
import { ConfigData } from "./site-config.interface";

const CONFIG_DATA_KEY = "site-config-key"

export class SiteConfigService {
  async allConfigs(): Promise<ConfigData | null> {
    const configData = await redis.get(CONFIG_DATA_KEY);
    return configData ? JSON.parse(configData) as ConfigData : null;
  }

  async getConfig(key: string) {
    const configData = await redis.get(CONFIG_DATA_KEY);
    const config = configData ? JSON.parse(configData) as ConfigData : {};
    return config[key]
  }

  async createConfig(key: string, value: Object) {
    const configData = await redis.get(CONFIG_DATA_KEY);
    const configObject = configData ? JSON.parse(configData) as ConfigData : {};
    configObject[key] = value;
    await redis.set(CONFIG_DATA_KEY, JSON.stringify(configObject))
  }
}
