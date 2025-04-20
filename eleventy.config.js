import CleanCSS from "clean-css";

function configureBuild(eleventyConfig) {
  // ✅ Copy these files/folders to the _site output unchanged
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("images");

  // ✅ Add a filter to minify CSS
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
}

function addCollections(eleventyConfig) {
  // All poems collection
  eleventyConfig.addCollection("poems", collection =>
    collection.getFilteredByGlob("poems/**/*.md")
  );

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
}

export default async function (eleventyConfig) {
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
