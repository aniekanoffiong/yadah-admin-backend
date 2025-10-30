import redis from "../../external/redis.client";
import { ConfigData } from "./siteConfig.interface";

const SYSTEM_CONFIG_KEY = "site-config-key"

// config item keys
export const CONFIG_ITEM_KEYS = {
  COMING_SOON: 'comingSoon',
  FOOTER: 'footer',
  // add more keys as needed
}

export class SiteConfigService {
  async allConfigs(): Promise<ConfigData> {
    const configData = await redis.get(SYSTEM_CONFIG_KEY);
    return configData ? JSON.parse(configData) as ConfigData : {};
  }

  async getConfig(key: string) {
    const configData = await redis.get(SYSTEM_CONFIG_KEY);
    const config = configData ? JSON.parse(configData) as ConfigData : {};
    return config[key]
  }

  async createConfig(key: string, value: Object) {
    const configData = await redis.get(SYSTEM_CONFIG_KEY);
    const configObject = configData ? JSON.parse(configData) as ConfigData : {};
    configObject[key] = value;
    await redis.set(SYSTEM_CONFIG_KEY, JSON.stringify(configObject))
    return configObject[key];
  }

  async removeConfig(key: string) {
    const configData = await redis.get(SYSTEM_CONFIG_KEY);
    const configObject = configData ? JSON.parse(configData) as ConfigData : {};
    const updatedConfigObject = Object.fromEntries(
      Object.entries(configObject).filter(([currentKey]) => currentKey !== key)
    )
    await redis.set(SYSTEM_CONFIG_KEY, JSON.stringify(updatedConfigObject))
  }
}
