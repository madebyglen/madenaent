CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_time DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "products_select_all" ON products FOR SELECT
    TO anon, authenticated USING (true);

CREATE POLICY "products_insert_admin" ON products FOR INSERT
    TO authenticated WITH CHECK (true);

CREATE POLICY "products_update_admin" ON products FOR UPDATE
    TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "products_delete_admin" ON products FOR DELETE
    TO authenticated USING (true);

CREATE POLICY "orders_select_all" ON orders FOR SELECT
    TO anon, authenticated USING (true);

CREATE POLICY "orders_insert_all" ON orders FOR INSERT
    TO anon, authenticated WITH CHECK (true);

CREATE POLICY "orders_update_all" ON orders FOR UPDATE
    TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "orders_delete_all" ON orders FOR DELETE
    TO anon, authenticated USING (true);

CREATE POLICY "order_items_select_all" ON order_items FOR SELECT
    TO anon, authenticated USING (true);

CREATE POLICY "order_items_insert_all" ON order_items FOR INSERT
    TO anon, authenticated WITH CHECK (true);

CREATE POLICY "order_items_update_all" ON order_items FOR UPDATE
    TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "order_items_delete_all" ON order_items FOR DELETE
    TO anon, authenticated USING (true);

CREATE POLICY "messages_select_all" ON messages FOR SELECT
    TO anon, authenticated USING (true);

CREATE POLICY "messages_insert_all" ON messages FOR INSERT
    TO anon, authenticated WITH CHECK (true);

CREATE POLICY "messages_update_all" ON messages FOR UPDATE
    TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "messages_delete_all" ON messages FOR DELETE
    TO anon, authenticated USING (true);

INSERT INTO products (name, description, category, price, image_url, stock) VALUES
    ('Tactical Leather Wallet', 'Premium full-grain leather tactical wallet with RFID blocking and hidden compartment. Built for durability and everyday carry.', 'wallets', 89.99, 'https://images.pexels.com/photos/162712/egg-basket-eggs-food-white-162712.jpeg?auto=compress&cs=tinysrgb&w=600', 25),
    ('Slim Carbon Fiber Wallet', 'Ultra-slim carbon fiber wallet with money clip and card holder. Minimalist design with maximum strength.', 'wallets', 45.99, 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600', 40),
    ('Bifold Tactical Wallet', 'Tactical bifold wallet with reinforced stitching and multiple card slots. Perfect for EDC enthusiasts.', 'wallets', 67.99, 'https://images.pexels.com/photos/207943/pexels-photo-207943.jpeg?auto=compress&cs=tinysrgb&w=600', 30),
    ('Full-Grain Leather Belt', 'Handcrafted full-grain leather belt with solid brass buckle. Classic style meets rugged durability.', 'belts', 119.99, 'https://images.pexels.com/photos/461236/pexels-photo-461236.jpeg?auto=compress&cs=tinysrgb&w=600', 20),
    ('Tactical Riggers Belt', 'Heavy-duty tactical riggers belt with reinforced webbing and quick-release buckle. Rated for high loads.', 'belts', 79.99, 'https://images.pexels.com/photos/2832/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600', 35),
    ('Nylon Web Duty Belt', 'Professional nylon web duty belt with adjustable fit and heavy-duty hardware. Perfect for active professionals.', 'belts', 55.99, 'https://images.pexels.com/photos/291210/pexels-photo-291210.jpeg?auto=compress&cs=tinysrgb&w=600', 50),
    ('Tactical Folding Knife', 'Tactical folding knife with D2 steel blade, G10 handle, and smooth ball-bearing pivot. Razor sharp and reliable.', 'knives', 145.99, 'https://images.pexels.com/photos/365631/pexels-photo-365631.jpeg?auto=compress&cs=tinysrgb&w=600', 15),
    ('EDC Pocket Knife', 'Compact EDC pocket knife with Sandvik steel blade and titanium handle. Perfect for everyday tasks.', 'knives', 89.99, 'https://images.pexels.com/photos/906056/pexels-photo-906056.jpeg?auto=compress&cs=tinysrgb&w=600', 28),
    ('Survival Fixed Blade', 'Full-tang survival fixed blade knife with Kydex sheath and paracord handle wrap. Built for the wilderness.', 'knives', 199.99, 'https://images.pexels.com/photos/596134/pexels-photo-596134.jpeg?auto=compress&cs=tinysrgb&w=600', 12),
    ('Expanding Steel Baton', 'Professional-grade expanding steel baton with hardened steel construction and rubber grip. 21-inch extended length.', 'batons', 89.99, 'https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg?auto=compress&cs=tinysrgb&w=600', 18),
    ('Tactical Impact Baton', 'Tactical impact baton with reinforced polymer shaft and ergonomic grip. Lightweight and effective.', 'batons', 65.99, 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600', 22),
    ('Compact Collapsible Baton', 'Compact collapsible baton with 16-inch length and quick-deploy mechanism. Ideal for concealed carry.', 'batons', 49.99, 'https://images.pexels.com/photos/1071248/pexels-photo-1071248.jpeg?auto=compress&cs=tinysrgb&w=600', 30);
