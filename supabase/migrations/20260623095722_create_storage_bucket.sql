/*
# Create Supabase Storage bucket for product images

1. New Storage Setup
- Create a public storage bucket named "product-images" for product uploads
- Allow anonymous uploads to the bucket (for the single-tenant storefront)

2. Security
- RLS policies for the storage.objects table to allow anon uploads
*/

-- Create the bucket (if not exists) via storage schema
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable public access for anonymous uploads
CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public selects"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'product-images');
