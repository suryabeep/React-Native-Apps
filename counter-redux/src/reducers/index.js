import { combineReducers } from 'redux';
 
const countReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            state = Object.assign({}, state, { count: state.count + 1});
            return state;
        case 'DECREMENT':
            state = Object.assign({}, state, { count: state.count - 1});
            return state;
        default:
            return state;
    }
};
 
// Combine all the reducers
const rootReducer = combineReducers({
    countReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;