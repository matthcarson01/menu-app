import axios from "axios";
// Action Constants
const REQ_USER = "REQ_USER",
  REQ_RESTAURANT = "REQ_RESTAURANT",
  REQ_RESTAURANTS = "REQ_RESTAURANTS",
  REQ_SECTIONS = "REQ_SECTIONS",
  REQ_ITEMS = "REQ_ITEMS",
  REQ_PAGE = "REQ_PAGE",
  EDIT_RESTAURANT = "EDIT_RESTAURANT",
  ADD_ITEMS = "ADD_ITEMS";


// Action Creators
export function requestUser() {
  return {
    type: REQ_USER,
    payload: axios.get("/api/me")
                  .then(response => response.data)
  };
}
export function requestPage(url) {
  return {
    type: REQ_PAGE,
    payload: axios.get(`/api/restaurant/${url}`)
                  .then(response => response.data)
  };
}
export function requestRestaurants(terms) {
  let{city,type}=terms;
  return {
    type: REQ_RESTAURANTS,
    payload: axios.get(`/api/restaurants?city=${city}&type=${type}`)
                  .then(response => response.data)
  };
}
export function requestRestaurant(id) {
  return {
    type: REQ_RESTAURANT,
    payload: axios.get(`/api/user_restaurant/${id}`)
                  .then(response => {return response.data})
  };
}
export function requestSections(restaurant_id){
  return{
    type:REQ_SECTIONS,
    payload: axios.get(`/api/get_sections/${restaurant_id}`)
                  .then(response => {return response.data})
  }
}
export function requestItems(section_id){
  return{
    type:REQ_ITEMS,
    payload: axios.get(`/api/items/${section_id}`)
                  .then(response => {return response.data})
  }
}
export function editRestaurant(restaurant){
  let {
        user_id, 
        restaurant_name, 
        owner_name, 
        address, 
        city, 
        state, 
        zip, 
        phone, 
        email, 
        cover_image, 
        restaurant_type
      } = restaurant;
  return { type: EDIT_RESTAURANT, payload: axios
      .put(`/api/user_restaurant_edit/${user_id}`, {
        restaurant_name,
        owner_name,
        address,
        city,
        state,
        zip,
        phone,
        email,
        cover_image,
        restaurant_type
      })
      .then(response => {return response.data;})
    }
}
export function addItems(item){
  let {
      section_id,
      item_name,
      item_description,
      item_image,
      item_price
    } = item;
  return{
    type:ADD_ITEMS,
    payload: axios.post("/api/item", {
        section_id: section_id,
        item_name: item_name,
        item_description: item_description,
        item_image: item_image,
        item_price: item_price
      }).then(response => {return response.data})
  }
}

// Initial State
const initialState = {
  user: {},
  restaurant: [],
  sections:[],
  items:[],
  item:{},
  restaurants:[],
};

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQ_USER + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });
    case REQ_RESTAURANTS + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_RESTAURANTS + "_FULFILLED":
      console.log("REQ_RESTAURANTS RAN", action.payload);
      return Object.assign({}, state, {
        isLoading: false,
        restaurants: action.payload
      });
    case REQ_RESTAURANT + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_RESTAURANT + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        restaurant: action.payload
      });
    case REQ_PAGE + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_PAGE + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        restaurant: action.payload
      });
    case REQ_SECTIONS + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_SECTIONS + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        sections: action.payload
      });
    case REQ_ITEMS + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_ITEMS + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        items: action.payload
      });
    case EDIT_RESTAURANT + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case EDIT_RESTAURANT + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        restaurant: action.payload
      });
    case ADD_ITEMS + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case ADD_ITEMS + "_FULFILLED":
      console.log("ADD_ITEMS", action.payload);
      return Object.assign({}, state, {
        isLoading: false,
        item: action.payload
      });
    default:
      return state;
  }
}
