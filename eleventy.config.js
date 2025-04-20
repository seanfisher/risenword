import CleanCSS from "clean-css";

export default async function (eleventyConfig) {
  // ✅ Copy these files/folders to the _site output unchanged
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("images");

  // ✅ Add a filter to minify CSS
  eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

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
