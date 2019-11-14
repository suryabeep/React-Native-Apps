export function increment() {
    return (dispatch) => {
        dispatch({type: 'INCREMENT'});
    };
}
export function decrement() {
    return (dispatch) => {
        dispatch({type: 'DECREMENT'});
    };
}