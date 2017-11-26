INSERT INTO menu_items (item_id, section_id, item_name, item_description, item_image, item_price) 
VALUES (DEFAULT, $1, $2, $3, $4, $5) 
RETURNING item_name, item_description, item_image, item_price;