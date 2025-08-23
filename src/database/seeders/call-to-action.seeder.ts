import { CallToAction, CTAButton } from '../../modules/cta/cta.entity';
import { SpecificPage } from '../../utils/enums';
import { AppDataSource } from '../data-source';

const callToActionData = {
  title: 'Ready to Visit or Get Involved?',
  subtitle: 'Take your next step with us...',
  page: SpecificPage.HOME,
  buttons: [
    { text: "Let's Plan Your Visit", variant: 'primary', icon: 'calendar' },
    { text: 'Join a Small Group', variant: 'secondary', icon: 'users' }
  ]
};

export async function seedCallToAction() {
  const ctaRepo = AppDataSource.getRepository(CallToAction);
  const btnRepo = AppDataSource.getRepository(CTAButton);

  const cta = ctaRepo.create({
    title: callToActionData.title,
    subtitle: callToActionData.subtitle,
    page: callToActionData.page
  });
  await ctaRepo.save(cta);

  for (const btn of callToActionData.buttons) {
    const button = btnRepo.create({ ...btn, callToAction: cta });
    await btnRepo.save(button);
  }
  console.log('Seeded CallToAction and CTAButtons');
}
