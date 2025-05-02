import { DateTime } from "luxon";
import CleanCSS from "clean-css";
import { execSync } from 'child_process';
import postcssPlugin from "@jgarber/eleventy-plugin-postcss";

// Utility function to sort poems by title, ignoring stopwords
function sortPoemsByTitle(poems) {
  const stopWordsRegex = /^(a |an |the |and |but |or |for |nor |on |at |to |from |by )/i;
  return poems.sort((a, b) => {
    const titleA = a.data.title.toLowerCase().replace(stopWordsRegex, "").trim();
    const titleB = b.data.title.toLowerCase().replace(stopWordsRegex, "").trim();
    return titleA.localeCompare(titleB);
  });
}

function configureBuild(eleventyConfig) {
  // Run Vite build before Eleventy
  // eleventyConfig.on('beforeBuild', () => {
  //   console.log('Running Vite build...');
  //   execSync('npx vite build', { stdio: 'inherit' });
  // });

  // ✅ Copy these files/folders to the _site output unchanged
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("images");

  // Copy specific static files to the output directory
  eleventyConfig.addPassthroughCopy("android-chrome-192x192.png");
  eleventyConfig.addPassthroughCopy("android-chrome-512x512.png");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("site.webmanifest");

  // ✅ Add a filter to minify CSS
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("date", function (dateObj, format = 'LLLL dd, yyyy') {
    // Add a friendly date filter to nunjucks.
    // Defaults to format of LLLL dd, yyyy unless an alternate is passed as a parameter.
    // {{ date | friendlyDate('OPTIONAL FORMAT STRING') }}
    // List of supported tokens: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
    if (dateObj instanceof Date) {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc',
        locale: "en"
      }).toFormat(format);
    } else {
      return DateTime.fromISO(dateObj, {
        zone: "utc",
        locale: "en"
      }).toFormat(format);
    }
  });

  eleventyConfig.addFilter("index", (array, item) => {
    return array.findIndex(i => i.url === item.url);
  });
}

function addCollections(eleventyConfig) {
  // All poems collection, sorted by title ignoring common stop words
  eleventyConfig.addCollection("poems", collection => {
    return sortPoemsByTitle(collection.getFilteredByGlob("poems/**/*.md"));
  });

  // Contest years dynamically (2025, etc.)
  eleventyConfig.addCollection("contestYears", collection => {
    const set = new Set();
    collection.getFilteredByGlob("poems/**/*.md").forEach(p => {
      if (p.data.year) set.add(p.data.year);
    });
    return [...set].sort();
  });

  // Poem categories
  eleventyConfig.addCollection("categories", collection => {
    const set = new Set();
    collection.getFilteredByGlob("poems/**/*.md").forEach(p => {
      if (p.data.category) set.add(p.data.category);
    });
    return [...set].sort();
  });

  // Group by category
  eleventyConfig.addCollection("poemsByCategory", collection => {
    const map = new Map();
    collection.getFilteredByGlob("poems/**/*.md").forEach(p => {
      const c = p.data.category;
      if (!c) return;
      (map.get(c) || map.set(c, []).get(c)).push(p);
    });
    return Object.fromEntries(map.entries());
  });

  // Group by year
  eleventyConfig.addCollection("poemsByYear", collection => {
    const map = new Map();
    collection.getFilteredByGlob("poems/**/*.md").forEach(p => {
      const c = p.data.year;
      if (!c) return;
      (map.get(c) || map.set(c, []).get(c)).push(p);
    });
    return Object.fromEntries(map.entries());
  });

  // Group by author
  eleventyConfig.addCollection("poemsByAuthor", collection => {
    const map = new Map();
    collection.getFilteredByGlob("poems/**/*.md").forEach(p => {
      const author = p.data.author;
      if (!author) return;
      (map.get(author) || map.set(author, []).get(author)).push(p);
    });
    for (const [key, poems] of map.entries()) {
      map.set(key, sortPoemsByTitle(poems));
    };
    return Object.fromEntries(map.entries());
  });

  // List of unique authors, sorted alphabetically
  eleventyConfig.addCollection("authors", collection => {
    const set = new Set();
    collection.getFilteredByGlob("poems/**/*.md").forEach(p => {
      if (p.data.author) set.add(p.data.author);
    });
    return [...set].sort((a, b) => a.localeCompare(b));
  });
}

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(postcssPlugin);

  configureBuild(eleventyConfig);
  addCollections(eleventyConfig);
}

export const config = {
  dir: {
    input: ".",
    includes: "_includes",
    data: "_data",
    output: "_site"
  },
  markdownTemplateEngine: "njk"
};
