import { AppDataSource } from '../data-source';
import { Event } from '../../modules/event/event.entity';

const eventsData = [
  {
    title: "Christmas Eve Service",
    startDate: new Date("December 24, 2025 19:00:00"),
    endDate: new Date("December 24, 2025 21:00:00"),
    location: "Main Sanctuary",
    description:
      "Join us for a special Christmas Eve service filled with carols, candlelight, and the celebration of Christ's birth.",
    image:
      "https://images.unsplash.com/photo-1482575832494-771f74bf6155?w=380&h=240&fit=crop",
  },
  {
    title: "New Year Prayer Vigil",
    startDate: new Date("December 31, 2025 22:00:00"),
    endDate: new Date("January 1, 2026 00:30:00"),
    location: "Main Sanctuary",
    audience: "All Ages",
    description:
      "Welcome the new year with prayer, worship, and reflection as we seek God's guidance for the year ahead.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=380&h=240&fit=crop",
  },
  {
    title: "Youth Winter Retreat",
    startDate: new Date("January 15, 2026 18:00:00"),
    endDate: new Date("January 17, 2026 16:00:00"),
    location: "Mountain View Camp",
    audience: "Ages 13-18",
    description:
      "A weekend retreat for youth to grow in faith, build friendships, and have fun in God's creation.",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=380&h=240&fit=crop",
  },
  {
    title: "Youth Winter Retreat",
    startDate: new Date("January 15, 2025 18:00:00"),
    endDate: new Date("January 17, 2025 16:00:00"),
    location: "Church Parking Lot",
    audience: "Church Parking Lot",
    description:
      "Strengthen your marriage with biblical principles, practical tools, and fellowship with other couples.",
    image:
      "https://images.unsplash.com/photo-1482575832494-771f74bf6155?w=380&h=240&fit=crop",
  },
  {
    title: "Youth Winter Retreat",
    startDate: new Date("January 15, 2025 18:00:00"),
    endDate: new Date("January 17, 2025 16:00:00"),
    location: "Camp Everest",
    audience: "Teens and Youths",
    description:
      "Strengthen your marriage with biblical principles, practical tools, and fellowship with other couples.",
    image:
      "https://images.unsplash.com/photo-1482575832494-771f74bf6155?w=380&h=240&fit=crop",
  },
  {
    title: "Gifted Hands Prayer",
    startDate: new Date("April 25, 2025 18:00:00"),
    endDate: new Date("April 27, 2025 16:00:00"),
    location: "Church Auditorium",
    audience: "All ages",
    description:
      "Strengthen your marriage with biblical principles, practical tools, and fellowship with other couples.",
    image:
      "https://images.unsplash.com/photo-1482575832494-771f74bf6155?w=380&h=240&fit=crop",
  },
  {
    title: "Community Food Drive",
    startDate: new Date("January 25, 2026 09:00:00"),
    endDate: new Date("January 25, 2026 15:00:00"),
    location: "Church Parking Lot",
    audience: "All Ages",
    description:
      "Help us serve our community by donating and distributing food to families in need.",
    image:
      "https://images.unsplash.com/photo-1482575832494-771f74bf6155?w=380&h=240&fit=crop",
  },
  {
    title: "Marriage Enrichment Workshop",
    startDate: new Date("August 8, 2025 10:00:00"),
    endDate: new Date("August 8, 2025 16:00:00"),
    location: "Fellowship Hall",
    audience: "Married Couples",
    description:
      "Strengthen your marriage with biblical principles, practical tools, and fellowship with other couples.",
    image:
      "https://images.unsplash.com/photo-1482575832494-771f74bf6155?w=380&h=240&fit=crop",
  },
  {
    title: "Easter Sunrise Service",
    startDate: new Date("April 20, 2025 06:30:00"),
    endDate: new Date("April 20, 2025 07:30:00"),
    location: "Church Garden",
    audience: "All Ages",
    description:
      "Celebrate the resurrection of Jesus Christ with an outdoor sunrise service in our beautiful garden.",
    image:
      "https://images.unsplash.com/photo-1482575832494-771f74bf6155?w=380&h=240&fit=crop",
  },
];

export async function seedEvents() {
  const eventRepository = AppDataSource.getRepository(Event);
  for (const e of eventsData) {
    const event = eventRepository.create(e);
    await eventRepository.save(event);
  }
  console.log('Seeded events successfully!');
}
