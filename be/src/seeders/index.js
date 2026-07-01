require('dotenv').config();
const db = require('../config/database');
const seedCategories = require('./categories.seed');
const seedTags = require('./tags.seed');
const seedStacks = require('./stacks.seed');

async function runSeeders() {
  console.log('🚀 Starting database seeding...\n');

  try {
    // Test database connection
    await db.query('SELECT 1');
    console.log('✅ Database connection established\n');

    // Run seeders sequentially
    await seedCategories();
    await seedTags();
    await seedStacks();

    console.log('\n🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

// Run seeders
runSeeders();
