// import { log } from "util";

module.exports = {
    getRestaurant: (req,res,next) => {
        const dbInstance = req.app.get('db');
        dbInstance.getRestaurantByUser([req.params.id])
                .then(restaurant => {
                    res.status(200).send(restaurant)
                    })
                .catch(()=> (console.log));
    },
    updateRestaurant:(req,res,next)=>{

    },
    createRestaurant:(req,res,next)=>{
        const dbInstance = req.app.get('db');
        const user_id = req.params.id;
        const {restaurant_name, 
            owner_name, 
            address, 
            city, 
            state, 
            zip,
            phone,
            email,
            cover_image,
            restaurant_type} = req.body;
        dbInstance.createUserRestaurant([
            restaurant_name,
            owner_name,
            address,
            city,
            state,
            zip,
            phone,
            email,
            cover_image,
            restaurant_type,
            user_id
          ])
          .then(restaurant => {
            res.status(200).send(restaurant);
          })
          .catch(() => console.log);
    }
}