const initialState =
     JSON.parse(localStorage.getItem("userId")) || {}
;

function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
    return maxId + 1;
}
export default function userCredentialsReducer(state = initialState, action) {
    switch (action.type) {
        case "userCredentials/setUserCredentials": {
            // Can return just the new todos array - no extra object around it
            return {
                ...state,
                userId: action.payload.userId,
                userEmail: action.payload.userEmail
            };
        }
        default:
            return state;
    }
}
