import { CallToAction, CTAButton } from '../../modules/cta/cta.entity';
import { AppDataSource } from '../data-source';

const callToActionData = {
  title: 'Ready to Visit or Get Involved?',
  subtitle: 'Take your next step with us...',
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
    subtitle: callToActionData.subtitle
  });
  await ctaRepo.save(cta);

  for (const btn of callToActionData.buttons) {
    const button = btnRepo.create({ ...btn, callToAction: cta });
    await btnRepo.save(button);
  }
  console.log('Seeded CallToAction and CTAButtons');
}
