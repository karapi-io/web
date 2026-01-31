import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "https://fvztokgsspwatypgiqtr.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2enRva2dzc3B3YXR5cGdpcXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDkzOTMsImV4cCI6MjA4NTI4NTM5M30.FhFBY0j7cE4NgXBbOhZ_JMHo5MAKEEzB6_IdCZA4MsE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
