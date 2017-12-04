UPDATE restaurants 
SET restaurant_name = $1, 
    address=$2, 
    city=$3, 
    state=$4, 
    zip=$5,
    phone=$6,
    email=$7,
    cover_image=$8,
    restaurant_type=$9,
    restaurant_url=$10
WHERE user_id = $11
RETURNING *;