import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // Seed Users

  const password = await bcrypt.hash('hashedpassword123', 10);
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'admin@example.com',
        username: 'adminUser',
        hashedPassword: password,
        firstName: 'Admin',
        lastName: 'User',
        balance: 1000,
        role: 'ADMIN',
      },
      {
        email: 'user1@example.com',
        username: 'userOne',
        hashedPassword: password,
        firstName: 'User',
        lastName: 'One',
        balance: 500,
      },
      {
        email: 'user2@example.com',
        username: 'userTwo',
        hashedPassword: password,
        firstName: 'User',
        lastName: 'Two',
        balance: 300,
      },
    ],
  });
  console.log(`Created ${users.count} users`);

  // Seed Films with Reviews to Maintain Rating Integrity
  const films = await prisma.film.createMany({
    data: [
      {
        title: 'Inception',
        description: 'A mind-bending thriller by Christopher Nolan.',
        director: 'Christopher Nolan',
        release_year: 2010,
        genre: ['Action', 'Sci-Fi', 'Thriller'],
        price: 20,
        duration: 148,
        ratingCount: 5,
        rating: 4.8,
        cover_image_url: 'https://example.com/inception.jpg',
        video_url: 'https://example.com/inception.mp4',
      },
      {
        title: 'The Matrix',
        description: 'A hacker discovers the world is a simulation.',
        director: 'Lana Wachowski, Lilly Wachowski',
        release_year: 1999,
        genre: ['Action', 'Sci-Fi'],
        price: 15,
        duration: 136,
        ratingCount: 4,
        rating: 4.9,
        cover_image_url: 'https://example.com/matrix.jpg',
        video_url: 'https://example.com/matrix.mp4',
      },
    ],
  });
  console.log(`Created ${films.count} films`);

  // Seed Reviews with Correct Rating Count and Average
  const inceptionFilm = await prisma.film.findFirst({ where: { title: 'Inception' } });
  const matrixFilm = await prisma.film.findFirst({ where: { title: 'The Matrix' } });

  const inceptionReviews = [
    { rating: 5, review: 'Fantastic!', username: 'userOne' },
    { rating: 4, review: 'Really good!', username: 'user2@example.com' },
    { rating: 5, review: 'Mind-blowing!', username: 'userOne' },
    { rating: 5, review: 'Incredible!', username: 'user2@example.com' },
    { rating: 5, review: 'Loved it!', username: 'userOne' },
  ];

  const matrixReviews = [
    { rating: 5, review: 'A classic!', username: 'userOne' },
    { rating: 5, review: 'Revolutionary!', username: 'user2@example.com' },
    { rating: 5, review: 'Ahead of its time!', username: 'userOne' },
    { rating: 4, review: 'Amazing!', username: 'user2@example.com' },
  ];

  for (const review of inceptionReviews) {
    await prisma.review.create({
      data: {
        filmId: inceptionFilm.id,
        username: review.username,
        Review: review.review,
        Rating: review.rating,
      },
    });
  }

  for (const review of matrixReviews) {
    await prisma.review.create({
      data: {
        filmId: matrixFilm.id,
        username: review.username,
        Review: review.review,
        Rating: review.rating,
      },
    });
  }

  // Update Films with correct rating count and average
  await prisma.film.update({
    where: { id: inceptionFilm.id },
    data: {
      ratingCount: inceptionReviews.length,
      rating:
        inceptionReviews.reduce((sum, review) => sum + review.rating, 0) / inceptionReviews.length,
    },
  });

  await prisma.film.update({
    where: { id: matrixFilm.id },
    data: {
      ratingCount: matrixReviews.length,
      rating: matrixReviews.reduce((sum, review) => sum + review.rating, 0) / matrixReviews.length,
    },
  });

  console.log('Seeding completed with data integrity maintained.');
}

main()
  .then(() => {
    console.log('Seeding completed');
  })
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
