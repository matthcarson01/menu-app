INSERT INTO menu_sections (section_id, section_name)
VALUES (DEFAULT, $1) RETURNING *;
INSERT INTO menu(section_id, restaurant_id)
VALUES((SELECT section_id from menu_sections order by section_id desc limit 1), $2);