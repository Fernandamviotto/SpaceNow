import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ohxdolbdxxtbifrlglko.supabase.co/";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oeGRvbGJkeHh0YmlmcmxnbGtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MjcxODMsImV4cCI6MjA3MjAwMzE4M30.uPci09990pjFGIVdSVfXzlOf7Dh14bceMP8RNyHVhp0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
