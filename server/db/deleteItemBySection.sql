DELETE FROM menu_items 
WHERE section_id=$1
RETURNING *;