const db = require('../config/database');

const categories = [
  { name: 'Web Development', slug: 'web-development' },
  { name: 'Mobile App', slug: 'mobile-app' },
  { name: 'Desktop App', slug: 'desktop-app' },
  { name: 'Landing Page', slug: 'landing-page' },
  { name: 'Dashboard', slug: 'dashboard' },
  { name: 'E-commerce', slug: 'e-commerce' },
  { name: 'Portfolio', slug: 'portfolio' },
  { name: 'Blog', slug: 'blog' },
  { name: 'SaaS', slug: 'saas' },
  { name: 'Admin Panel', slug: 'admin-panel' },
];

async function seedCategories() {
  console.log('🌱 Seeding categories...');
  let created = 0;
  let skipped = 0;

  try {
    for (const category of categories) {
      // Check if category already exists
      const [existing] = await db.query('SELECT id FROM categories WHERE slug = ?', [
        category.slug,
      ]);

      if (existing.length === 0) {
        await db.query('INSERT INTO categories (name, slug) VALUES (?, ?)', [
          category.name,
          category.slug,
        ]);
        created++;
      } else {
        skipped++;
      }
    }

    console.log(`✅ Categories: ${created} created, ${skipped} skipped`);
    return { created, skipped };
  } catch (error) {
    console.error('❌ Error seeding categories:', error.message);
    throw error;
  }
}

module.exports = seedCategories;
