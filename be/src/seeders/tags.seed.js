const db = require('../config/database');

const tags = [
  // UI/UX Tags
  'responsive',
  'dark-mode',
  'light-mode',
  'minimalist',
  'modern',
  'glassmorphism',
  'neumorphism',
  'gradient',
  'animated',
  'interactive',
  // Tech Tags
  'typescript',
  'javascript',
  'api',
  'rest-api',
  'graphql',
  'websocket',
  'real-time',
  'pwa',
  'spa',
  'ssr',
  // Features
  'authentication',
  'authorization',
  'payment',
  'stripe',
  'paypal',
  'search',
  'filter',
  'pagination',
  'crud',
  'form-validation',
  // Framework Related
  'react',
  'vue',
  'angular',
  'svelte',
  'nextjs',
  'nuxt',
  'gatsby',
  'remix',
  // Style
  'tailwind',
  'bootstrap',
  'material-ui',
  'chakra-ui',
  'sass',
  'css-modules',
  // Backend
  'nodejs',
  'express',
  'nestjs',
  'fastify',
];

async function seedTags() {
  console.log('🌱 Seeding tags...');
  let created = 0;
  let skipped = 0;

  try {
    for (const tagName of tags) {
      const slug = tagName.toLowerCase().replace(/\s+/g, '-');

      // Check if tag already exists
      const [existing] = await db.query('SELECT id FROM tags WHERE slug = ?', [slug]);

      if (existing.length === 0) {
        await db.query('INSERT INTO tags (name, slug) VALUES (?, ?)', [tagName, slug]);
        created++;
      } else {
        skipped++;
      }
    }

    console.log(`✅ Tags: ${created} created, ${skipped} skipped`);
    return { created, skipped };
  } catch (error) {
    console.error('❌ Error seeding tags:', error.message);
    throw error;
  }
}

module.exports = seedTags;
