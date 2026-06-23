/*
# Fix RLS policies for products table

1. Changes
- Add INSERT, UPDATE, DELETE policies for `anon` role so the backend API (using anon key) can manage products
- Keep SELECT policy for both `anon` and `authenticated`

2. Security
- Products table is intentionally public for a single-tenant E-commerce storefront
- No user_id or ownership tracking needed
*/

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anon and authenticated to INSERT
DROP POLICY IF EXISTS "products_insert_all" ON products;
CREATE POLICY "products_insert_all" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Allow anon and authenticated to UPDATE
DROP POLICY IF EXISTS "products_update_all" ON products;
CREATE POLICY "products_update_all" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

-- Allow anon and authenticated to DELETE
DROP POLICY IF EXISTS "products_delete_all" ON products;
CREATE POLICY "products_delete_all" ON products FOR DELETE
  TO anon, authenticated USING (true);

-- Keep SELECT policy for both
DROP POLICY IF EXISTS "products_select_all" ON products;
CREATE POLICY "products_select_all" ON products FOR SELECT
  TO anon, authenticated USING (true);
