module.exports = {
  siteUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://www.atlantabrewerytours.com/',
  generateRobotsTxt: true, // (optional)
  // ...other options
}