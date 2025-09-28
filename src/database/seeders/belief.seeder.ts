import { Belief } from "../../modules/belief/belief.entity";
import { GrowInFaith } from "../../modules/growInFaith/growInFaith.entity";
import { AppDataSource } from "../data-source";

const beliefData = {
  "title": "What we Believe in!",
  "subtitle": "Our beliefs are rooted in Scripture and centered on the person and work of Jesus Christ.",
  "items": [
    {
      "title": "The Bible",
      "content": "We believe the Bible is the inspired and infallible Word of God, our final authority for faith and practice. Scripture is God-breathed and profitable for teaching, reproof, correction, and training in righteousness.",
    },
    {
      "title": "Salvation",
      "content": "We believe salvation is by grace alone through faith alone in Christ alone. It is not by works but by God's gift of grace through Jesus Christ's sacrifice on the cross for our sins.",
    },
    {
      "title": "The Trinity",
      "content": "We believe in one God eternally existing in three distinct persons: Father, Son, and Holy Spirit. Each person is fully God, yet there is only one God.",
    },
    {
      "title": "Worship",
      "content": "We believe worship is our response to God's character and work. We worship through prayer, praise, music, giving, serving, and living lives that honor God in all we do.",
    },
    {
      "title": "Baptism",
      "content": "We believe in baptism by immersion as an outward expression of an inward faith, symbolizing our death to sin and resurrection to new life in Christ.",
    }
  ]
};

export async function seedBelief() {
  const beliefRepository = AppDataSource.getRepository(Belief);
  const belief = beliefRepository.create(beliefData);
  await beliefRepository.save(belief);
  console.log('Seeded belief successfully!');
}
