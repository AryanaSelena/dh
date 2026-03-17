// netlify/functions/add-watchlist.js
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const { symbol, user_id } = JSON.parse(event.body);

  const { data, error } = await supabase
    .from('watchlists')
    .insert([{ symbol, user_id }]);

  if (error) {
    return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
  }

  return { statusCode: 200, body: JSON.stringify({ success: true, data }) };
};
