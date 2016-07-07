
import {
  CREATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  GET_TASK_SUCCESS,
  CHANGE_CURRENT_FOCUS,
  CUT_NODE,
  START_LISTENING,
} from './action-types';

export const initialState = {
  deleted: null,
  list: [],
  previous: [],
};




export function treeReducer(state =initialState, action) {

  switch (action.type) {
    case CREATE_TASK_SUCCESS:
      let list;

      if (state.deleted && state.deleted.key === action.payload.key) {
        list = [ ...state.previous ];
      }
      else {
        list = [ action.payload, ...state.list ];
      }

      return {
        deleted: null,
        list,
        previous: []
      };


    case DELETE_TASK_SUCCESS:
      return {
        deleted: action.payload,
        list: state.list.filter(task => {
          return task.key !== action.payload.key;
        }),
        previous: [ ...state.list ]
      };

    case UPDATE_TASK_SUCCESS:
      return {
        deleted: null,
        list: state.list.map(task => {
          return task.key === action.payload.key ? action.payload : task;
        }),
        previous: []
      };


    case GET_TASK_SUCCESS:

      //console.log(action.payload)
      let value = action.payload.value

      var lists = Object.keys(value).map(
        function(key){
          return Object.assign(
            {}, 
            value[key],
            {key: key}
          )
        }
      )

      return {
        deleted: null,
        list: lists,
        previous: []
      };


    default:
      return state;
  }
}


export const filesInitalState = {
  key: null,
  ref: null,
  currentFocus: null,//which node is in focus
  cut: null, //which node is in cut state
} 

export function files2Reducer(state = filesInitalState, action) {
  switch (action.type) {

    case GET_TASK_SUCCESS:
      return Object.assign({}, state, {[action.payload.id]: treeReducer(initialState, action)})

    case START_LISTENING:
      return Object.assign({}, state, {key:action.payload.key, ref:action.payload.ref})

    case CHANGE_CURRENT_FOCUS:
      return Object.assign({}, state, {currentFocus: action.payload})

    case CUT_NODE:
      return Object.assign({}, state, {cut: action.payload})

    default:
      return state;
  }
}
