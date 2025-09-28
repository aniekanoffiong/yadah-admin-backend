import { CurrencySymbol } from "../../modules/give/give.dto";
import { Give } from "../../modules/give/give.entity";
import { AppDataSource } from "../data-source";

const giveData = {
  optionsHeading: "Choose Your Area of Impact",
  currencies: [
    {
      name: "British Pounds",
      symbol: CurrencySymbol.GBP,
    },
    {
      name: "US Dollars",
      symbol: CurrencySymbol.USD,
    },
    {
      name: "Euros",
      symbol: CurrencySymbol.EUR,
    },
  ],
  givingArea: [
    {
      title: "General Fund",
      description: "Supports overall church operations, staff, and ministries",
    },
    {
      title: "Mission",
      description: "Local and global missionary work and outreach programs",
    },
    {
      title: "Youth Program",
      description: "Programs, camps, and activities for children and teenagers",
    },
    {
      title: "Building Fund",
      description: "Facility maintenance, improvements, and expansion projects",
    },
    {
      title: "Benevolence",
      description: "Assistance for community members in financial need",
    },
    {
      title: "Education",
      description: "Bible studies, seminars, and educational resources",
    },
  ]
};

export async function seedGiveData() {
  const giveRepository = AppDataSource.getRepository(Give);
  const data = giveRepository.create(giveData);
  await giveRepository.save(data);
  console.log('Seeded give data successfully!');
}
