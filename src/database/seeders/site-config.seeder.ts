import { CONFIG_ITEM_KEYS, SiteConfigService } from '../../modules/site-config/siteConfig.service';

const siteConfigSeedingData = [
  {
    key: CONFIG_ITEM_KEYS.COMING_SOON,
    value: {
      'default': false,
      'localhost:5176': false,
      'localhost:5177': false,
      'v1.cityofyadah.co.uk': false,
      'cityofyadah.co.uk': true,
    },
  },
];

export async function seedSiteConfig() {
  const configService = new SiteConfigService();
  for (const config of siteConfigSeedingData) {
    await configService.createConfig(config.key, config.value);
  }
  console.log('Seeded Site Config');
}
