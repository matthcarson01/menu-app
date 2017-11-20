UPDATE restaurants 
SET restaurant_name = $1, 
    owner_name=$2,
    address=$3, 
    city=$4, 
    state=$5, 
    zip=$6,
    phone=$7,
    email=$8,
    cover_image=$9,
    restaurant_type=$10
WHERE user_id = $11
RETURNING *;