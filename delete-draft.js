require('dotenv').config();
const GhostAdminAPI = require('@tryghost/admin-api');

// Initialize Ghost Admin API
const ghost = new GhostAdminAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_API_KEY,
  version: 'v4', // or the version of your Ghost installation
});

async function deleteDrafts() {
  try {
    console.log('Script started.');

    // Fetch all draft posts
    const posts = await ghost.posts.browse({ filter: 'status:draft' });

    console.log(`Found ${posts.length} draft post(s).`);

    // Delete all draft posts
    const deletePromises = posts.map((post) => ghost.posts.delete({ id: post.id }));

    await Promise.all(deletePromises);

    console.log('All draft posts have been deleted.');
  } catch (error) {
    console.error('Error during script execution:', error.message);
  } finally {
    console.log('Script completed.');
  }
}

deleteDrafts();
