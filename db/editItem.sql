UPDATE menu_items
SET item_name = $2, 
    item_description = $3,
    item_image = $4, 
    item_price = $5
WHERE item_id = $1
RETURNING *;