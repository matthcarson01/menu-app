INSERT INTO menu_sections (section_id, section_name) VALUES (DEFAULT, $1) RETURNING section_id, section_name;