SELECT r.restaurant_id, s.section_id, s.section_name
FROM menu AS m 
INNER JOIN menu_sections AS s ON s.section_id = m.section_id
INNER JOIN restaurants AS r ON r.restaurant_id = m.restaurant_id
WHERE r.restaurant_id = $1;