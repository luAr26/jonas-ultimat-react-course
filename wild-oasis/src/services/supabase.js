/** @format */

import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wunilooqeqtriufpoqvw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bmlsb29xZXF0cml1ZnBvcXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyNzk5NTcsImV4cCI6MjAzMDg1NTk1N30.9z7ykCoY7z0PmQM-6K0m_kzyMH-6eMBumQqGYUYmY_c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
