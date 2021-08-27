const GET_DIRECTIONS = 'direction/GET_DIRECTIONS';
const GET_DIRECTIONS_BY_RECIPE = 'direction/GET_DIRECTIONS_BY_RECIPE';
const ADD_DIRECTION = 'direction/ADD_DIRECTION';
const EDIT_DIRECTION = 'direction/EDIT_DIRECTION';
const DELETE_DIRECTION = 'direction/DELETE_DIRECTION';

const loadDirections = (directions) => {
    return {
        type: GET_DIRECTIONS,
        directions
    }
}

const loadDirectionsByRecipe = (direction) => {
    return {
        type: GET_DIRECTIONS_BY_RECIPE,
        direction
    }
}

const addDirection = (direction) => {
    return {
        type: ADD_DIRECTION,
        direction
    }
}

const editDirection = (direction) => {
    return {
        type: EDIT_DIRECTION,
        direction
    }
}

const deleteDirection = (direction) => {
    return {
        type: DELETE_DIRECTION,
        direction
    }
}

export const getDirections = () => async(dispatch) => {
    const res = await fetch('/api/direction/');

    if (res.ok) {
        const directions = await res.json();
        await dispatch(loadDirections(directions))
        return res;
    }
}

export const getDirectionsByRecipeThunk = (recipeId) => async(dispatch) => {
    const res = await fetch(`/api/direction/recipeId/${ recipeId }/`);
    const { allDirectionsByRecipe } = await res.json();

    if (res.ok) {
        dispatch(loadDirectionsByRecipe(allDirectionsByRecipe))
        return allDirectionsByRecipe
        // dispatch(loadMemoriesByRecipe(recipeMemoryText))
    }

    return allDirectionsByRecipe;
}

export const createDirectionThunk = direction => async (dispatch) => {
    const response = await fetch(`/api/direction/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(direction)
    })
    if (response.ok) {
        const newDirection = await response.json();
        dispatch(addDirection(newDirection))
    }
    return response
}

export const editDirectionThunk = (direction) => async(dispatch) => {
    const res = await fetch(`/api/direction/${ direction.id }/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(direction)
    })
    if(res.ok) {
        const editedDirection = await res.json();
        dispatch(editDirection(editedDirection));
    }
    return res;
}

export const deleteDirectionThunk = (id) => async(dispatch) => {
    console.log("in direction thunk:", id)
    const res = await fetch(`/api/direction/${ id }/`, {
        method: "DELETE",
    })
    if (res.ok) {
        const deletedDirection = await res.json();
        console.log("deleted direction:", deletedDirection)
        dispatch(deleteDirection(deletedDirection.id));
    }
    return res;
}

const initialState = {}

export default function directions(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_DIRECTION: {
            return {
                ...state,
                [action.direction.id]: action.direction
            }
        }
        case EDIT_DIRECTION: {
            console.log("Action.direction", action.direction)
            // newState = { ...state}
            return {
                ...state,
                [action.direction.id]: action.direction
            }
        }
        case DELETE_DIRECTION: {
            newState = { ...state }
            delete newState[action.direction];
            return newState;
        }
        case GET_DIRECTIONS_BY_RECIPE: {

            return action.direction;
        }
        default:
            return state;
    }

}
