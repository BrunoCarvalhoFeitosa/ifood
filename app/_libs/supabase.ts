import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ezafeolqfkggqkvnyfxj.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6YWZlb2xxZmtnZ3Frdm55ZnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NDY1NTgsImV4cCI6MjAzMDAyMjU1OH0.2ThASpS6FwEhZ4BclvzpUSRVTgDOO914ELme0Ror1Ok"
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }
