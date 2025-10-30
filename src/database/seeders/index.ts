import { seedAboutSection } from "./about.seeder";
import { seedCallToAction } from "./call-to-action.seeder";
import { seedContactInfo } from "./contact.seeder";
import { seedFooter } from "./footer.seeder";
import { seedGalleryItems } from "./gallery-and-filter.seeder";
import { seedHeroes } from "./hero.seeder";
import { seedMinistries } from "./ministries.seeder";
import { seedPastor } from "./pastor.seeder";
import { seedSermons } from "./sermon.seeder";
import { AppDataSource } from "../data-source";
import { seedPermissions } from "./permission.seeder";
import { seedRolesWithPermissions } from "./role-permission.seeder";
import { seedEvents } from "./event.seeder";
import { seedUser } from "./user.seeder";
import { seedConfigFields } from "./config-field.seeder";
import { seedPaymentOption } from "./payment-option.seeder";
import { seedNextSteps } from "./next-step.seeder";
import { seedScheduledPrograms } from "./scheduled-program.seeder";
import { seedStatistics } from "./statistics.seeder";
import { seedGrowInFaith } from "./growInFaith.seeder";
import { seedBelief } from "./belief.seeder";
import { seedGiveData } from "./give.seeder";
import { seedSiteConfig } from "./site-config.seeder";

async function runSeeders() {
  const connection = await AppDataSource.initialize();
  await seedSiteConfig();
  await seedHeroes();
  await seedGalleryItems();
  await seedMinistries();
  await seedSermons();
  await seedAboutSection();
  await seedPastor();
  await seedContactInfo();
  await seedCallToAction();
  await seedFooter();
  await seedPermissions();
  await seedRolesWithPermissions();
  await seedUser();
  await seedEvents();
  await seedConfigFields();
  await seedPaymentOption();
  await seedNextSteps();
  await seedGiveData();
  await seedGrowInFaith();
  await seedBelief();
  await seedScheduledPrograms();
  await seedStatistics();
  console.log('All seeders done');
  connection.destroy();
  return;
}

runSeeders()
