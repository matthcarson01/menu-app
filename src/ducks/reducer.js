import axios from "axios";
// Action Constants
const REQ_USER = "REQ_USER";
const REQ_RESTAURANT = "REQ_RESTAURANT";
const REQ_SECTIONS = "REQ_SECTIONS"

// Action Creators
export function requestUser() {
  return {
    type: REQ_USER,
    payload: axios.get("/api/me")
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

// Initial State
const initialState = {
  user: {},
  restaurant: [],
  sections:[]
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
    case REQ_RESTAURANT + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_RESTAURANT + "_FULFILLED":
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
    default:
      return state;
  }
}
