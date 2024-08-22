import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const movies = [
  {
    title: 'The Shawshank Redemption',
    description:
      'Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
    director: 'Frank Darabont',
    release_year: '1994',
    genre: ['Drama', 'Crime'],
    price: 50000,
    duration: 142,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'The Godfather',
    description:
      'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
    director: 'Francis Ford Coppola',
    release_year: '1972',
    genre: ['Drama', 'Crime'],
    price: 40000,
    duration: 175,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'The Godfather Part II',
    description:
      'In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.',
    director: 'Francis Ford Coppola',
    release_year: '1974',
    genre: ['Drama', 'Crime'],
    price: 10000,
    duration: 202,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: "Schindler's List",
    description:
      'The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.',
    director: 'Steven Spielberg',
    release_year: '1993',
    genre: ['Drama', 'History', 'War'],
    price: 40000,
    duration: 195,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: '12 Angry Men',
    description:
      "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and shut case soon becomes a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other.",
    director: 'Sidney Lumet',
    release_year: '1957',
    genre: ['Drama'],
    price: 50000,
    duration: 97,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'Spirited Away',
    description:
      'A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.',
    director: 'Hayao Miyazaki',
    release_year: '2001',
    genre: ['Animation', 'Family', 'Fantasy'],
    price: 50000,
    duration: 125,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'Dilwale Dulhania Le Jayenge',
    description:
      'Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fianc\u00e9. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.',
    director: 'Aditya Chopra',
    release_year: '1995',
    genre: ['Comedy', 'Drama', 'Romance'],
    price: 20000,
    duration: 190,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/lfRkUr7DYdHldAqi3PwdQGBRBPM.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'The Dark Knight',
    description:
      'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.',
    director: 'Christopher Nolan',
    release_year: '2008',
    genre: ['Drama', 'Action', 'Crime', 'Thriller'],
    price: 40000,
    duration: 152,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'Parasite',
    description:
      "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    director: 'Bong Joon-ho',
    release_year: '2019',
    genre: ['Comedy', 'Thriller', 'Drama'],
    price: 50000,
    duration: 133,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'The Green Mile',
    description:
      "A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people's ailments. When the cell block's head guard, Paul Edgecomb, recognizes Coffey's miraculous gift, he tries desperately to help stave off the condemned man's execution.",
    director: 'Frank Darabont',
    release_year: '1999',
    genre: ['Fantasy', 'Drama', 'Crime'],
    price: 10000,
    duration: 189,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'Your Name.',
    description:
      'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki\u2019s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.',
    director: 'Makoto Shinkai',
    release_year: '2016',
    genre: ['Animation', 'Romance', 'Drama'],
    price: 10000,
    duration: 106,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'Pulp Fiction',
    description:
      "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
    director: 'Quentin Tarantino',
    release_year: '1994',
    genre: ['Thriller', 'Crime'],
    price: 40000,
    duration: 154,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'The Lord of the Rings: The Return of the King',
    description:
      'As armies mass for a final battle that will decide the fate of the world--and powerful, ancient forces of Light and Dark compete to determine the outcome--one member of the Fellowship of the Ring is revealed as the noble heir to the throne of the Kings of Men. Yet, the sole hope for triumph over evil lies with a brave hobbit, Frodo, who, accompanied by his loyal friend Sam and the hideous, wretched Gollum, ventures deep into the very dark heart of Mordor on his seemingly impossible quest to destroy the Ring of Power.\u200b',
    director: 'Peter Jackson',
    release_year: '2003',
    genre: ['Adventure', 'Fantasy', 'Action'],
    price: 20000,
    duration: 201,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'The Count of Monte-Cristo',
    description:
      'Edmond Dantes becomes the target of a sinister plot and is arrested on his wedding day for a crime he did not commit. After 14 years in the island prison of Ch\u00e2teau d\u2019If, he manages a daring escape. Now rich beyond his dreams, he assumes the identity of the Count of Monte-Cristo and exacts his revenge on the three men who betrayed him.',
    director: 'Alexandre de La Patelli\u00e8re',
    release_year: '2024',
    genre: ['Adventure', 'History', 'Action', 'Drama', 'Romance', 'Thriller'],
    price: 30000,
    duration: 178,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/aHRUsFln97FlIdsvYKFT3z5ubYE.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'Forrest Gump',
    description:
      'A man with a low IQ has accomplished great things in his life and been present during significant historic events\u2014in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.',
    director: 'Robert Zemeckis',
    release_year: '1994',
    genre: ['Comedy', 'Drama', 'Romance'],
    price: 40000,
    duration: 142,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'GoodFellas',
    description:
      'The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age and climbs the ranks of a Mafia family under the guidance of Jimmy Conway.',
    director: 'Martin Scorsese',
    release_year: '1990',
    genre: ['Drama', 'Crime'],
    price: 50000,
    duration: 145,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'The Good, the Bad and the Ugly',
    description:
      'While the Civil War rages on between the Union and the Confederacy, three men \u2013 a quiet loner, a ruthless hitman, and a Mexican bandit \u2013 comb the American Southwest in search of a strongbox containing $200,000 in stolen gold.',
    director: 'Sergio Leone',
    release_year: '1966',
    genre: ['Western'],
    price: 40000,
    duration: 161,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'Seven Samurai',
    description:
      "A samurai answers a village's request for protection after he falls on hard times. The town needs protection from bandits, so the samurai gathers six others to help him teach the people how to defend themselves, and the villagers provide the soldiers with food.",
    director: 'Akira Kurosawa',
    release_year: '1954',
    genre: ['Action', 'Drama'],
    price: 30000,
    duration: 207,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/8OKmBV5BUFzmozIC3pPWKHy17kx.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'Impossible Things',
    description:
      'After the death of her abusive husband, Matilde finds her new best friend in Miguel, her young, insecure, and disoriented neighbor.',
    director: 'Ernesto Contreras',
    release_year: '2021',
    genre: ['Family', 'Drama'],
    price: 40000,
    duration: 88,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/t2Ew8NZ8Ci2kqmoecZUNQUFDJnQ.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
  {
    title: 'Grave of the Fireflies',
    description:
      'In the final months of World War II, 14-year-old Seita and his sister Setsuko are orphaned when their mother is killed during an air raid in Kobe, Japan. After a falling out with their aunt, they move into an abandoned bomb shelter. With no surviving relatives and their emergency rations depleted, Seita and Setsuko struggle to survive.',
    director: 'Isao Takahata',
    release_year: '1988',
    genre: ['Animation', 'Drama', 'War'],
    price: 30000,
    duration: 89,
    cover_image_url: 'https://image.tmdb.org/t/p/w500/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg',
    video_url:
      'https://res.cloudinary.com/dxhqzio5h/video/upload/v1724174513/b21811da-b85a1e92_fa9hb5.mp4',
  },
];

const reviews = [
  'Fantastic!',
  'Really good!',
  'Mind-blowing!',
  'Incredible!',
  'Loved it!',
  'A classic!',
  'Revolutionary!',
  'Ahead of its time!',
  'Amazing!',
  'Exceptional!',
  'A masterpiece!',
  'Brilliant!',
  'Outstanding!',
  'Remarkable!',
  'Phenomenal!',
  'Top-notch!',
  'Breathtaking!',
  'Spectacular!',
  'Fantastic experience!',
  'Highly recommended!',
  'Unforgettable!',
  'Impressive!',
  'Flawless!',
  'A triumph!',
];

const ratings = [4, 4.5, 5];

function getRandomItem(list: any[]) {
  return list[Math.floor(Math.random() * list.length)];
}

async function createUser(email, username, firstName, lastName, balance, role: Role = 'USER') {
  const hashedPassword = await bcrypt.hash('Password123!', 10);
  return prisma.user.create({
    data: {
      email,
      username,
      hashedPassword,
      firstName,
      lastName,
      balance,
      role,
    },
  });
}

async function createFilmWithReviews(movie, users, reviews) {
  const randomRating = getRandomItem(ratings);
  const ratingCount = randomRating == 4.5 ? 2 : 1;
  const film = await prisma.film.create({
    data: {
      title: movie.title,
      description: movie.description,
      director: movie.director,
      release_year: Number(movie.release_year),
      genre: movie.genre,
      price: movie.price,
      duration: movie.duration * 60,
      cover_image_url: movie.cover_image_url,
      video_url: movie.video_url,
      ratingCount: ratingCount,
      rating: randomRating,
    },
  });

  const reviewData = getReviewData(film.id, randomRating, users, reviews);
  await prisma.review.createMany({ data: reviewData.reviews });
  await prisma.transaction.createMany({ data: reviewData.transactions });
  await prisma.wishlist.createMany({ data: reviewData.wishlists });
}

function getReviewData(filmId, rating, users, reviews) {
  const reviewData = {
    reviews: [],
    transactions: [],
    wishlists: [],
  };

  if (rating == 4) {
    reviewData.reviews.push(createReview(users[0], filmId, 4, reviews));
    reviewData.transactions.push(createTransaction(users[0], filmId));
    reviewData.wishlists.push(createWishlist(users[2], filmId));
  } else if (rating == 5) {
    reviewData.reviews.push(createReview(users[1], filmId, 5, reviews));
    reviewData.transactions.push(createTransaction(users[1], filmId));
    reviewData.wishlists.push(createWishlist(users[3], filmId));
  } else {
    reviewData.reviews.push(
      createReview(users[2], filmId, 4, reviews),
      createReview(users[3], filmId, 5, reviews),
    );
    reviewData.transactions.push(
      createTransaction(users[2], filmId),
      createTransaction(users[3], filmId),
    );
    reviewData.wishlists.push(createWishlist(users[1], filmId));
    reviewData.wishlists.push(createWishlist(users[0], filmId));
  }

  return reviewData;
}

function createReview(user, filmId, rating, reviews) {
  return {
    review: getRandomItem(reviews),
    rating: rating,
    username: user.username,
    filmId,
  };
}

function createTransaction(user, filmId) {
  return {
    filmId,
    userId: user.id,
    boughtAt: new Date(),
  };
}

function createWishlist(user, filmId) {
  return {
    filmId,
    userId: user.id,
  };
}

async function main() {
  const users = await Promise.all([
    createUser('admin@example.com', 'adminUser', 'Admin', 'User', 1000, 'ADMIN'),
    createUser('user1@example.com', 'userOne', 'User', 'One', 500),
    createUser('user2@example.com', 'userTwo', 'User', 'Two', 300),
    createUser('user3@example.com', 'userThree', 'User', 'Three', 500),
    createUser('user4@example.com', 'userFour', 'User', 'Four', 300),
  ]);

  const filteredUsers = users.filter((user) => user.role === 'USER');

  for (const movie of movies) {
    await createFilmWithReviews(movie, filteredUsers, reviews);
  }
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
