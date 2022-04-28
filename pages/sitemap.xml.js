import fs from "fs";

const Sitemap = () => {};

// create dynamic sitemap.xml file
export const getServerSideProps = ({ req, res }) => {
  const urls = fs.readdirSync("pages");

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const url of urls) {
    if (url.indexOf(".js") !== -1 && url !== "_app.js" && url !== "dashboard.js" && url !== "sitemap.xml.js" && url !== "robots.txt.js" && url !== "_middleware.js") {
      sitemap += `  <url>\n    <loc>http://${req.headers.host}/${url}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    }
  }

  sitemap += `</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.charset = "UTF-8";
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
