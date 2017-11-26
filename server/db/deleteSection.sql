DELETE FROM menu WHERE section_id=$1;
DELETE FROM menu_sections WHERE section_id=$1
RETURNING *;