import { NextStep, NextStepVariants } from '../../modules/nextStep/nextStep.entity';
import { SpecificPage } from '../../utils/enums';
import { AppDataSource } from '../data-source';

const nextStepsData = {
  title: "Take Your Next Step",
  subtitle: "Whether you're exploring faith for the first time or looking to deepen your relationship with God, there's a place for you at Grace Community.",
  variant: NextStepVariants.StandardNextStep,
  items: [
    {
      icon: "calendar",
      title: "Plan Your Visit",
      description: "Join us this Sunday for worship and fellowship",
      buttonText: "Plan a Visit",
      buttonLink: "/events",
    },
    {
      icon: "play",
      title: "Watch Live",
      description: "Experience our services from anywhere",
      buttonText: "Watch Now",
      buttonLink: "/watch-live",
    },
    {
      icon: "heart",
      title: "Make a donation",
      description: "Support our mission and community outreach",
      buttonText: "Give Now",
      buttonLink: "/give",
    },
    {
      icon: "users",
      title: "Join Community",
      description: "Connect with others through small groups",
      buttonText: "Get Connected",
      buttonLink: "/ministries",
    }
  ]
};

const questionNextStepsData = {
  title: "Take Your Next Step",
  subtitle: "Whether you're exploring faith for the first time or looking to deepen your relationship with God, there's a place for you at Grace Community.",
  variant: NextStepVariants.QuestionNextStep,
  page: SpecificPage.MINISTRY,
  items: [
    {
      icon: "calendar",
      title: "Plan Your Visit",
      description: "Join us this Sunday for worship and fellowship",
      buttonText: "Plan a Visit",
      buttonLink: "/visit"
    },
    {
      icon: "play",
      title: "Watch Live",
      description: "Experience our services from anywhere",
      buttonText: "Watch Now",
      buttonLink: "/live"
    },
    {
      icon: "heart",
      title: "Give Back",
      description: "Support our mission and community outreach",
      buttonText: "Give Now",
      buttonLink: "/give"
    },
    {
      icon: "users",
      title: "Join Community",
      description: "Connect with others through small groups",
      buttonText: "Get Connected",
      buttonLink: "/connect"
    }
  ],
}

export async function seedNextSteps() {
  const nextStepRepo = AppDataSource.getRepository(NextStep);
  await nextStepRepo.save(nextStepsData);
  await nextStepRepo.save(questionNextStepsData);

  console.log('Seeded Next Steps');
}
