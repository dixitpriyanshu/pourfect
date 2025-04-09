-- 🍹 Cocktails
insert into cocktails (id, name, image_url, instructions, glass_type)
values
(gen_random_uuid(), 'Mojito', 'https://aubegvyvxyeuzkqpszvy.supabase.co/storage/v1/s3/cocktails/mojito.jpg', 'Muddle mint leaves with sugar and lime juice. Add rum and top with soda water.', 'Highball glass'),
(gen_random_uuid(), 'Whiskey Sour', 'https://aubegvyvxyeuzkqpszvy.supabase.co/storage/v1/s3/cocktails/whiskey_sour.jpg', 'Shake whiskey, lemon juice, and sugar with ice. Strain into a glass.', 'Old-fashioned glass'),
(gen_random_uuid(), 'Cosmopolitan', 'https://aubegvyvxyeuzkqpszvy.supabase.co/storage/v1/s3/cocktails/cosmopolitan.jpg', 'Shake vodka, triple sec, cranberry juice, and lime juice with ice. Strain into a cocktail glass.', 'Cocktail glass');

-- 🍋 Ingredients
insert into ingredients (id, name) values
(gen_random_uuid(), 'Mint'),
(gen_random_uuid(), 'Lime Juice'),
(gen_random_uuid(), 'White Rum'),
(gen_random_uuid(), 'Sugar'),
(gen_random_uuid(), 'Soda Water'),
(gen_random_uuid(), 'Whiskey'),
(gen_random_uuid(), 'Lemon Juice'),
(gen_random_uuid(), 'Cranberry Juice'),
(gen_random_uuid(), 'Triple Sec'),
(gen_random_uuid(), 'Vodka');

-- 🔗 CocktailIngredients
-- Mojito
insert into cocktail_ingredients (cocktail_id, ingredient_id, measure)
select c.id, i.id, '6 leaves' from cocktails c, ingredients i where c.name = 'Mojito' and i.name = 'Mint';
insert into cocktail_ingredients (cocktail_id, ingredient_id, measure)
select c.id, i.id, '1 oz' from cocktails c, ingredients i where c.name = 'Mojito' and i.name = 'Lime Juice';
insert into cocktail_ingredients (cocktail_id, ingredient_id, measure)
select c.id, i.id, '2 oz' from cocktails c, ingredients i where c.name = 'Mojito' and i.name = 'White Rum';

-- Whiskey Sour
insert into cocktail_ingredients (cocktail_id, ingredient_id, measure)
select c.id, i.id, '2 oz' from cocktails c, ingredients i where c.name = 'Whiskey Sour' and i.name = 'Whiskey';
insert into cocktail_ingredients (cocktail_id, ingredient_id, measure)
select c.id, i.id, '1 oz' from cocktails c, ingredients i where c.name = 'Whiskey Sour' and i.name = 'Lemon Juice';

-- Cosmopolitan
insert into cocktail_ingredients (cocktail_id, ingredient_id, measure)
select c.id, i.id, '1.5 oz' from cocktails c, ingredients i where c.name = 'Cosmopolitan' and i.name = 'Vodka';
insert into cocktail_ingredients (cocktail_id, ingredient_id, measure)
select c.id, i.id, '1 oz' from cocktails c, ingredients i where c.name = 'Cosmopolitan' and i.name = 'Cranberry Juice';

-- 🧉 Alcohols
insert into alcohols (id, name, image_url)
values
(gen_random_uuid(), 'White Rum', 'https://aubegvyvxyeuzkqpszvy.supabase.co/storage/v1/s3/alcohols/white_rum.jpg'),
(gen_random_uuid(), 'Whiskey', 'https://aubegvyvxyeuzkqpszvy.supabase.co/storage/v1/s3/alcohols/whiskey.jpg'),
(gen_random_uuid(), 'Vodka', 'https://aubegvyvxyeuzkqpszvy.supabase.co/storage/v1/s3/alcohols/vodka.jpg');

-- 🔗 CocktailAlcohols
insert into cocktail_alcohols (cocktail_id, alcohol_id)
select c.id, a.id from cocktails c, alcohols a where c.name = 'Mojito' and a.name = 'White Rum';
insert into cocktail_alcohols (cocktail_id, alcohol_id)
select c.id, a.id from cocktails c, alcohols a where c.name = 'Whiskey Sour' and a.name = 'Whiskey';
insert into cocktail_alcohols (cocktail_id, alcohol_id)
select c.id, a.id from cocktails c, alcohols a where c.name = 'Cosmopolitan' and a.name = 'Vodka';
