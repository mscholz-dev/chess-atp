const Robots = () => {};

// create dynamic robots.txt file
export const getServerSideProps = ({ req, res }) => {
  const robots = `User-agent: *\nAllow: /\nDisallow: /dashboard\nSitemap: http://${req.headers.host}/sitemap.xml`;

  res.setHeader("Content-Type", "text/plain");
  res.charset = "UTF-8";
  res.write(robots);
  res.end();

  return { props: {} };
};

export default Robots;
