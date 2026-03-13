const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  // Rewrite all absolute URLs to respect pathPrefix (for GitHub Pages subpath)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/css/output.css");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");

  // Watch CSS for changes
  eleventyConfig.addWatchTarget("src/assets/css/");

  // Add a year shortcode for copyright
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Add phone format filter
  eleventyConfig.addFilter("phoneFormat", (phone) => {
    const digits = phone.replace(/\D/g, "");
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  });

  // Add phone href filter
  eleventyConfig.addFilter("phoneHref", (phone) => {
    return `tel:+1${phone.replace(/\D/g, "")}`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/"
  };
};
