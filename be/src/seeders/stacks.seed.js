const db = require('../config/database');

const stacks = [
  // Frontend Frameworks
  { name: 'React', slug: 'react', icon_url: '/icons/react.svg', category: 'frontend' },
  { name: 'Vue.js', slug: 'vue', icon_url: '/icons/vue.svg', category: 'frontend' },
  { name: 'Angular', slug: 'angular', icon_url: '/icons/angular.svg', category: 'frontend' },
  { name: 'Svelte', slug: 'svelte', icon_url: '/icons/svelte.svg', category: 'frontend' },
  { name: 'Next.js', slug: 'nextjs', icon_url: '/icons/nextjs.svg', category: 'frontend' },
  { name: 'Nuxt.js', slug: 'nuxt', icon_url: '/icons/nuxt.svg', category: 'frontend' },
  { name: 'Gatsby', slug: 'gatsby', icon_url: '/icons/gatsby.svg', category: 'frontend' },

  // Backend Frameworks
  { name: 'Node.js', slug: 'nodejs', icon_url: '/icons/nodejs.svg', category: 'backend' },
  { name: 'Express', slug: 'express', icon_url: '/icons/express.svg', category: 'backend' },
  { name: 'NestJS', slug: 'nestjs', icon_url: '/icons/nestjs.svg', category: 'backend' },
  { name: 'Django', slug: 'django', icon_url: '/icons/django.svg', category: 'backend' },
  { name: 'Flask', slug: 'flask', icon_url: '/icons/flask.svg', category: 'backend' },
  { name: 'Laravel', slug: 'laravel', icon_url: '/icons/laravel.svg', category: 'backend' },
  {
    name: 'Spring Boot',
    slug: 'spring-boot',
    icon_url: '/icons/spring.svg',
    category: 'backend',
  },
  { name: 'FastAPI', slug: 'fastapi', icon_url: '/icons/fastapi.svg', category: 'backend' },

  // Databases
  {
    name: 'PostgreSQL',
    slug: 'postgresql',
    icon_url: '/icons/postgresql.svg',
    category: 'database',
  },
  { name: 'MySQL', slug: 'mysql', icon_url: '/icons/mysql.svg', category: 'database' },
  { name: 'MongoDB', slug: 'mongodb', icon_url: '/icons/mongodb.svg', category: 'database' },
  { name: 'Redis', slug: 'redis', icon_url: '/icons/redis.svg', category: 'database' },
  { name: 'SQLite', slug: 'sqlite', icon_url: '/icons/sqlite.svg', category: 'database' },

  // CSS Frameworks
  { name: 'Tailwind CSS', slug: 'tailwind', icon_url: '/icons/tailwind.svg', category: 'css' },
  { name: 'Bootstrap', slug: 'bootstrap', icon_url: '/icons/bootstrap.svg', category: 'css' },
  { name: 'Material-UI', slug: 'material-ui', icon_url: '/icons/mui.svg', category: 'css' },
  { name: 'Chakra UI', slug: 'chakra-ui', icon_url: '/icons/chakra.svg', category: 'css' },
  { name: 'Sass', slug: 'sass', icon_url: '/icons/sass.svg', category: 'css' },

  // Tools
  { name: 'Docker', slug: 'docker', icon_url: '/icons/docker.svg', category: 'tool' },
  { name: 'Git', slug: 'git', icon_url: '/icons/git.svg', category: 'tool' },
  { name: 'TypeScript', slug: 'typescript', icon_url: '/icons/typescript.svg', category: 'tool' },
  { name: 'Webpack', slug: 'webpack', icon_url: '/icons/webpack.svg', category: 'tool' },
  { name: 'Vite', slug: 'vite', icon_url: '/icons/vite.svg', category: 'tool' },
];

async function seedStacks() {
  console.log('🌱 Seeding stacks...');
  let created = 0;
  let skipped = 0;

  try {
    for (const stack of stacks) {
      // Check if stack already exists
      const [existing] = await db.query('SELECT id FROM stacks WHERE slug = ?', [stack.slug]);

      if (existing.length === 0) {
        await db.query(
          'INSERT INTO stacks (name, slug, icon_url, category) VALUES (?, ?, ?, ?)',
          [stack.name, stack.slug, stack.icon_url, stack.category]
        );
        created++;
      } else {
        skipped++;
      }
    }

    console.log(`✅ Stacks: ${created} created, ${skipped} skipped`);
    return { created, skipped };
  } catch (error) {
    console.error('❌ Error seeding stacks:', error.message);
    throw error;
  }
}

module.exports = seedStacks;
