module.exports = {
  createSection: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { section_name, restaurant_id } = req.body;
    dbInstance
      .createSection([section_name])
      .then(section => {
        return res.status(201).send(section);
      })
      .catch(e => console.log(e));
  },
  createMenu: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { section_id, restaurant_id } = req.body;
    dbInstance
      .createMenuByRestaurant([section_id, restaurant_id])
      .then(menu => {
        res.status(201).send(menu);
      })
      .catch(e => console.log(e));
  },
  getSections: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .getSectionsByRestaurant([req.params.id])
      .then(sections => {
        res.status(200).send(sections);
      })
      .catch(() => console.log);
  },
  updateSection: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { section_id, section_name } = req.body;
    dbInstance
      .editSection([section_id, section_name])
      .then(section => {
        res.status(200).send(section);
      })
      .catch(() => console.log);
  },
  deleteSection: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .deleteSection([req.params.id])
      .then(() => res.status(200).send())
      .catch(e => console.log(e));
  },
  deleteItems: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .deleteItemBySection([req.params.id])
      .then(() => res.status(200).send())
      .catch(e => console.log(e));
  },
  getItems: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .getItemsBySection([req.params.id])
      .then(items => {
        res.status(200).send(items);
      })
      .catch(e => console.log(e));
  },
  getItem: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .getItem([req.params.id])
      .then(item => {
        res.status(200).send(item);
      })
      .catch(e => console.log(e));
  },
  addItem: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const {
      section_id,
      item_name,
      item_description,
      item_image,
      item_price
    } = req.body;
    dbInstance
      .createItemBySection([
        section_id,
        item_name,
        item_description,
        item_image,
        item_price
      ])
      .then(item => {
        res.status(200).send(item);
      })
      .catch(e => console.log(e));
  },
  updateItem: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const {
      item_id,
      item_name,
      item_description,
      item_image,
      item_price
    } = req.body;
    dbInstance
      .editItem([item_id, item_name, item_description, item_image, item_price])
      .then(item => {
        res.status(200).send(item);
      })
      .catch(e => console.log(e));
  },
  deleteItem: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .deleteItem([req.params.id])
      .then(item => {
        res.status(200).send(items);
      })
      .catch(e => console.log(e));
  }
};
