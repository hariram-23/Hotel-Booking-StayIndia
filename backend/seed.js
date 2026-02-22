require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Listing = require('./models/Listing');

const sampleListings = [
  {
    title: "Luxury Beach Resort - Goa",
    description: "Stunning beachfront resort with private beach access, infinity pool, spa facilities, and authentic Goan cuisine. Perfect for couples and families seeking a tropical paradise.",
    price: 8500,
    location: "Goa",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", filename: "default" }
  },
  {
    title: "Heritage Haveli - Jaipur",
    description: "Experience royal Rajasthani hospitality in this beautifully restored 200-year-old haveli. Features traditional architecture, courtyards, and modern amenities.",
    price: 6500,
    location: "Jaipur",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", filename: "default" }
  },
  {
    title: "Mountain View Resort - Manali",
    description: "Cozy mountain resort nestled in the Himalayas with breathtaking valley views. Ideal for adventure seekers and nature lovers. Includes trekking guides and bonfire nights.",
    price: 5500,
    location: "Manali",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", filename: "default" }
  },
  {
    title: "Houseboat Stay - Kerala Backwaters",
    description: "Traditional Kerala houseboat with modern comforts. Cruise through serene backwaters, enjoy authentic Kerala cuisine, and witness stunning sunsets.",
    price: 12000,
    location: "Alleppey",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80", filename: "default" }
  },
  {
    title: "Boutique Hotel - Udaipur",
    description: "Elegant lakeside boutique hotel with panoramic views of Lake Pichola and City Palace. Rooftop restaurant, infinity pool, and personalized service.",
    price: 9500,
    location: "Udaipur",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", filename: "default" }
  },
  {
    title: "Modern Apartment - Mumbai",
    description: "Stylish 2BHK apartment in South Mumbai with sea view. Walking distance to Gateway of India, Marine Drive, and top restaurants. Perfect for business and leisure travelers.",
    price: 7500,
    location: "Mumbai",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80", filename: "default" }
  },
  {
    title: "Tea Estate Bungalow - Darjeeling",
    description: "Colonial-era bungalow in a working tea estate. Wake up to misty mountain views, tour the tea factory, and enjoy fresh Darjeeling tea. Includes guided nature walks.",
    price: 6000,
    location: "Darjeeling",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80", filename: "default" }
  },
  {
    title: "Beachside Villa - Pondicherry",
    description: "French colonial villa steps from the beach. Features private garden, outdoor shower, and authentic French-Tamil fusion cuisine. Bicycles included for exploring the town.",
    price: 7000,
    location: "Pondicherry",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80", filename: "default" }
  },
  {
    title: "Desert Camp - Jaisalmer",
    description: "Luxury desert camp with Swiss tents, attached bathrooms, and cultural performances. Experience camel safari, stargazing, and traditional Rajasthani dinner under the stars.",
    price: 5000,
    location: "Jaisalmer",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80", filename: "default" }
  },
  {
    title: "Riverside Cottage - Rishikesh",
    description: "Peaceful cottage by the Ganges with yoga deck and meditation space. Perfect for spiritual seekers and adventure enthusiasts. Includes daily yoga sessions and rafting options.",
    price: 4500,
    location: "Rishikesh",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80", filename: "default" }
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Listing.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create regular user
    const user = new User({
      username: 'demo',
      email: 'demo@example.com',
      password: 'password123',
      role: 'user'
    });
    await user.save();
    console.log('Created demo user');

    // Create admin user
    const admin = new User({
      username: 'Hariram',
      email: '23211a6765@gmail.com',
      password: 'Hariram23@',
      role: 'admin'
    });
    await admin.save();
    console.log('Created admin user');

    const listingsWithOwner = sampleListings.map(listing => ({
      ...listing,
      owner: user._id
    }));

    await Listing.insertMany(listingsWithOwner);
    console.log('Seeded sample listings');

    console.log('Database seeded successfully!');
    console.log('Demo credentials: email: demo@example.com, password: password123');
    console.log('Admin credentials: email: 23211a6765@gmail.com, password: Hariram23@');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedDB();
