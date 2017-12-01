UPDATE menu_sections
SET section_name = $2
WHERE section_id=$1
RETURNING *;