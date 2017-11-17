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
    updateRestaurant:(req,res,next)={},
    createRestaurant:(req,res,next)={}
}