import { createClient } from '@supabase/supabase-js';

<<<<<<< HEAD
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL in .env');
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY in .env');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const filename = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}.${ext}`;
=======
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${ext}`;
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicUrl } = supabase.storage
    .from('product-images')
    .getPublicUrl(data.path);

  return publicUrl.publicUrl;
<<<<<<< HEAD
}
=======
}
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
