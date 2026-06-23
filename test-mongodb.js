// Test MongoDB Atlas Connection
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔄 Testing MongoDB Atlas Connection...\n');
console.log('Connection String:', MONGODB_URI?.replace(/:[^:]*@/, ':****@') || 'NOT FOUND');
console.log('');

async function testConnection() {
  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    console.log('✅ SUCCESS! Connected to MongoDB Atlas!');
    console.log('');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);
    console.log('');
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📊 Collections in database: ${collections.length}`);
    if (collections.length > 0) {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    } else {
      console.log('   (No collections yet - database is empty)');
    }
    
    console.log('');
    console.log('🎉 Your MongoDB Atlas is ready to use!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Run: node scripts/seed-products.js (to add products)');
    console.log('2. Start your website: npm run dev');
    console.log('');
    
  } catch (error) {
    console.error('❌ ERROR: Failed to connect to MongoDB Atlas');
    console.error('');
    console.error('Error message:', error.message);
    console.error('');
    console.error('Troubleshooting:');
    console.error('1. Check your username and password are correct');
    console.error('2. Verify your IP is whitelisted in MongoDB Atlas');
    console.error('3. Make sure the connection string is in .env.local');
    console.error('');
  } finally {
    await mongoose.connection.close();
    console.log('Connection closed.');
  }
}

testConnection();
