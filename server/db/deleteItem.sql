DELETE FROM menu_items WHERE item_id=$1
RETURNING *;