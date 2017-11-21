module.exports = {
    createSection:(req,res,next) => {
        const dbInstance = req.app.get("db");
        const { section_name } = req.body;
        dbInstance
          .createSection([section_name])
          .then(section => {res.status(200).send(section)})
          .catch(e => console.log(e));
    },
    createMenu: (req,res,next) => {
        const dbInstance = req.app.get("db");
        const { section_id, restaurant_id} = req.body;
        dbInstance
        .createMenuByRestaurant([section_id, restaurant_id])
        .then(menu => {res.status(200).send(menu)})
        .catch(e => console.log(e))
    }
}
