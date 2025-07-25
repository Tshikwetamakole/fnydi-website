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
    const limit = parseInt(params.get('limit')) || 10;
    const offset = parseInt(params.get('offset')) || 0;
    const category = params.get('category');

    // Build the query
    let query = sql`SELECT * FROM posts`;
    
    if (category) {
      query = query` WHERE category = ${category}`;
    }
    
    query = query` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    // Execute the query
    const posts = await query;

    // Get total count for pagination
    let countQuery = sql`SELECT COUNT(*) as total FROM posts`;
    if (category) {
      countQuery = countQuery` WHERE category = ${category}`;
    }
    
    const [countResult] = await countQuery;
    const total = countResult.total;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        data: posts,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + posts.length < total
        }
      })
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
