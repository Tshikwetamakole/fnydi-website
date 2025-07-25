const { neon } = require('@netlify/neon');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Get database URL from environment variable
    const databaseUrl = process.env.NETLIFY_DATABASE_URL;
    
    if (!databaseUrl) {
      throw new Error('NETLIFY_DATABASE_URL environment variable is not set');
    }

    // Initialize database connection
    const sql = neon(databaseUrl);

    // Parse query parameters
    const params = new URLSearchParams(event.queryStringParameters || {});
    const postId = params.get('id');

    if (!postId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Post ID is required' })
      };
    }

    // Query the database
    const [post] = await sql`
      SELECT * FROM posts 
      WHERE id = ${postId}
      LIMIT 1
    `;

    if (!post) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Post not found' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: post })
    };

  } catch (error) {
    console.error('Database query error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Database query failed', 
        message: error.message 
      })
    };
  }
};
