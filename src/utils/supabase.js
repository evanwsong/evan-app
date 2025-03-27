// This file handles the connection to Supabase. Keeps it seperate so that the same connection can be used in multiple files.
import { createClient } from "@supabase/supabase-js";

// Connect to Supabase - handles auth + database for blog posts
const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_KEY
  );

export default supabase;