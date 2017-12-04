module.exports = {
    getCities: (req,res,next) => {
        const dbInstance = req.app.get('db');
        dbInstance.getCities()
                .then(cities =>{res.status(200).send(cities)})
                .catch(()=> console.log);
    },
    getType: (req,res,next) => {
        const dbInstance = req.app.get('db');
        dbInstance.getType()
                .then(type =>{res.status(200).send(type)})
                .catch(()=> console.log);
    },
    getRestaurant: (req,res,next) => {
        const dbInstance = req.app.get('db');
        dbInstance.getRestaurantByUser([req.params.id])
                .then(restaurant => {
                    res.status(200).send(restaurant)
                    })
                .catch(()=> (console.log));
    },
    getRestaurants: (req,res,next) => {
        const dbInstance = req.app.get('db');
        if(req.query.city && req.query.type){
            console.log("Both Conditions")
        dbInstance
          .getRestaurants([req.query.city, req.query.type])
          .then(restaurants => {
            res.status(200).send(restaurants);
          })
          .catch(() => console.log);
        } else if(req.query.city){
            console.log("City Condtion")
        dbInstance
          .getRestaurantsByCity([req.query.city])
          .then(restaurants => {
            res.status(200).send(restaurants);
          })
          .catch(() => console.log);
        } else if (req.query.type){
            console.log("Type Condition")
        dbInstance
          .getRestaurantsByType([req.query.type])
          .then(restaurants => {
            res.status(200).send(restaurants);
          })
          .catch(() => console.log);
        }
    },
    getRestaurantByUrl: (req,res,next) => {
        const dbInstance = req.app.get('db');
        dbInstance.getRestaurantByUrl([req.params.url])
                .then(restaurant => {res.status(200).send(restaurant)})
                .catch(()=> (console.log));
    },
    createRestaurant:(req,res,next)=>{
        const dbInstance = req.app.get('db');
        const user_id = req.params.id;
        const {restaurant_name,  
            address, 
            city, 
            state, 
            zip,
            phone,
            email,
            cover_image,
            restaurant_type,
            restaurant_url} = req.body;
        dbInstance.createUserRestaurant([
            restaurant_name,
            address,
            city,
            state,
            zip,
            phone,
            email,
            cover_image,
            restaurant_type,
            restaurant_url,
            user_id
          ])
          .then(restaurant => {
            res.status(200).send(restaurant);
          })
          .catch((e) => console.log(e));
    },
    editRestaurant:(req,res,next)=>{
        const dbInstance = req.app.get('db');
        const user_id = req.params.id;
        const {restaurant_name, 
            address, 
            city, 
            state, 
            zip,
            phone,
            email,
            cover_image,
            restaurant_type,
            restaurant_url} = req.body;
        dbInstance.editRestaurantByUser([
            restaurant_name,
            address,
            city,
            state,
            zip,
            phone,
            email,
            cover_image,
            restaurant_type,
            restaurant_url,
            user_id
          ])
          .then(restaurant => {
            res.status(200).send(restaurant);
          })
          .catch(() => console.log);
    }
}