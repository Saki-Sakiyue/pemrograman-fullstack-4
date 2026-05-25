const axios = require('axios');
const cheerio = require('cheerio');

const { calculatePopularityScore, generateSourceIdentifier } = require('../utils/template');

const DEFAULT_CATEGORY_ID = 2;
const TAILWIND_STACK_ID = 3;

const CATEGORY_ID_MAP = new Map([
  ['business', 2],
  ['product', 2],
  ['agency', 2],
  ['hospitality', 2],
  ['services', 2],
  ['coming soon', 2],
  ['blog', 6],
  ['portfolio', 4],
  ['personal', 4],
  ['ecommerce', 3],
  ['dashboard', 1],
  ['documentation', 2],
  ['ui kit', 5],
  ['component library', 5],
]);

const TAG_MATCHERS = [
  { id: 1, pattern: /responsive/i },
  { id: 2, pattern: /dark/i },
  { id: 3, pattern: /minimal/i },
  { id: 4, pattern: /modern/i },
  { id: 5, pattern: /clean/i },
  { id: 6, pattern: /mobile/i },
  { id: 7, pattern: /seo/i },
  { id: 8, pattern: /animat|motion/i },
];

const normalizeCategoryKey = name => (name || '').trim().toLowerCase();

const resolveCategoryId = name => {
  const key = normalizeCategoryKey(name);
  return CATEGORY_ID_MAP.get(key) || DEFAULT_CATEGORY_ID;
};

const resolveTagIds = text => {
  const content = (text || '').trim();
  if (!content) return [];

  const ids = new Set();
  TAG_MATCHERS.forEach(({ id, pattern }) => {
    if (pattern.test(content)) ids.add(id);
  });
  return Array.from(ids);
};

class ScraperService {
  async scrapeHtml5Up() {
    const targetUrl = 'https://html5up.net/';

    const { data } = await axios.get(targetUrl);
    const $ = cheerio.load(data);

    const results = [];
    $('article.item').each((i, el) => {
      const title = $(el).find('h2').text().trim();
      const imagePath = $(el).find('img.placeholder').attr('data-src');
      const demoPath = $(el).find('a.button.demo').attr('href');
      const downloadPath = $(el).find('a.button.download').attr('href');

      // Raw nya (41,000) -> 41000
      const downloadCount =
        parseInt(
          $(el)
            .find('a.button.download em')
            .text()
            .replace(/[^0-9]/g, ''),
          10
        ) || 0;

      const sourceUrl = targetUrl;
      const imageUrl = imagePath ? new URL(imagePath, targetUrl).href : null;
      const demoUrl = demoPath ? new URL(demoPath, targetUrl).href : null;
      const downloadUrl = downloadPath ? new URL(downloadPath, targetUrl).href : null;

      const sourceIdentifier = generateSourceIdentifier(targetUrl, demoUrl, i);

      const category_id = DEFAULT_CATEGORY_ID;
      const template_stacks = [];
      const template_tags = [];

      results.push({
        title,
        description: null,
        upload_type: 'link',
        source_url: sourceUrl,
        demo_url: demoUrl,
        download_url: downloadUrl,
        download_count: downloadCount,
        popularity_score: calculatePopularityScore(0, 0, downloadCount),
        source_identifier: sourceIdentifier,
        category_id,
        template_stacks,
        template_tags,
        image_urls: [imageUrl],
      });
    });
    return results;
  }

  async scrapeHtmlRev() {
    const targetUrl = 'https://htmlrev.com/free-tailwind-templates.html';

    const { data } = await axios.get(targetUrl);
    const $ = cheerio.load(data);

    const results = [];
    let currentCategory = null;

    $('section.cards-1')
      .find('h2, .container-prim')
      .each((i, el) => {
        const $el = $(el);
        if ($el.is('h2')) {
          currentCategory = $el.text().trim();
          return;
        }

        if (!$el.hasClass('container-prim')) return;

        $el.find('.card').each((cardIndex, cardEl) => {
          const title = $(cardEl).find('h3').text().trim();
          const description = $(cardEl).find('p').text().trim();
          const imagePath =
            $(cardEl).find('img').attr('data-src') || $(cardEl).find('img').attr('src');
          const demoPath = $(cardEl).find('a').attr('href');
          const downloadPath = null;
          const downloadCount = 0;

          const sourceUrl = targetUrl;
          const imageUrl = imagePath ? new URL(imagePath, targetUrl).href : null;
          const demoUrl = demoPath ? new URL(demoPath, targetUrl).href : null;
          const downloadUrl = downloadPath ? new URL(downloadPath, targetUrl).href : null;

          const sourceIdentifier = generateSourceIdentifier(targetUrl, imageUrl, i + cardIndex);
          const category_id = resolveCategoryId(currentCategory);
          const template_stacks = [TAILWIND_STACK_ID];
          const template_tags = resolveTagIds(`${title} ${description}`);

          results.push({
            title,
            description,
            upload_type: 'link',
            source_url: sourceUrl,
            demo_url: demoUrl,
            download_url: downloadUrl,
            download_count: downloadCount,
            popularity_score: calculatePopularityScore(0, 0, downloadCount),
            source_identifier: sourceIdentifier,
            category_id,
            template_stacks,
            template_tags,
            image_urls: [imageUrl],
          });
        });
      });
    return results;
  }
}

const object = new ScraperService();
module.exports = object;
