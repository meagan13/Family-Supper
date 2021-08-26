const GET_MEMORIES = 'memory/GET_MEMORIES';
const GET_MEMORIES_BY_RECIPE = 'memory/GET_MEMORIES_BY_RECIPE';
const ADD_MEMORY = 'memory/ADD_MEMORY';
const EDIT_MEMORY = 'memory/EDIT_MEMORY';
const DELETE_MEMORY = 'memory/DELETE_MEMORY';

const loadMemories = (memories) => {
    return {
        type: GET_MEMORIES,
        memories
    }
}

const loadMemoriesByRecipe = (memory) => {
    return {
        type: GET_MEMORIES_BY_RECIPE,
        memory
    }
}

const addMemory = (memory) => {
    return {
        type: ADD_MEMORY,
        memory
    }
}

const editMemory = (memory) => {
    return {
        type: EDIT_MEMORY,
        memory
    }
}

const deleteMemory = (memory) => {
    return {
        type: DELETE_MEMORY,
        memory
    }
}

export const getMemories = () => async(dispatch) => {
    const res = await fetch('/api/memory/');

    // console.log("inside the thunk")

    if (res.ok) {
        const memories = await res.json();
        await dispatch(loadMemories(memories))
        return res;
    }
}

export const getMemoriesByRecipeThunk = (recipeId) => async(dispatch) => {
    // const res = await fetch(`/api/memory/${ id }`);
    // const res = await fetch(`/api/recipe/${ id }`);
    const res = await fetch(`/api/memory/recipeId/${ recipeId }/`);

    const recipeMemories = await res.json();

    if (res.ok) {
        dispatch(loadMemoriesByRecipe(recipeMemories))
        return recipeMemories
        // dispatch(loadMemoriesByRecipe(recipeMemoryText))
    }

    return recipeMemories;
}

export const createMemoryThunk = memory => async (dispatch) => {
    const response = await fetch(`/api/memory/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(memory)
    })
    if (response.ok) {
        const newMemory = await response.json();
        dispatch(addMemory(newMemory))
    }
    return response
}

export const editMemoryThunk = (memory) => async(dispatch) => {
    const res = await fetch(`/api/memory/${ memory.id }/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(memory)
    })
    if(res.ok) {
        const editedMemory = await res.json();
        dispatch(editMemory(editMemory));
    }
    return res;
}

export const deleteMemoryThunk = (id) => async(dispatch) => {
    const res = await fetch(`/api/memory/${ id }`, {
        method: "DELETE",
    })
    if (res.ok) {
        const deletedMemory = await res.json();
        dispatch(deleteMemory(deleteMemory));
    }
    return res;
}

const initialState = {}

export default function memories(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_MEMORY: {
            newState = {...state};
            newState?.memories?.push(action.memory);
            return newState;
        }
        case EDIT_MEMORY: {
            return {
                ...state,
                [action.memory.id]: {
                    ...state[action.memory.id],
                    ...action.memory
                }
            }
        }
        case DELETE_MEMORY: {
            newState = {...state};
            for (let i=0; i<newState.memories.length; i++){
                if (newState.memories[i] && (newState.memories[i].id === action.memory.id))
                    delete newState.memories[i];
            }
            alert("Memory deleted!")
            return newState;
        }
        case GET_MEMORIES: {
            const allMemories = {};
            action.memories.memories.forEach(memory => {
                allMemories[memory.id] = memory;
            });
            newState = { ...allMemories }
            return newState;
        }
        case GET_MEMORIES_BY_RECIPE: {
            return action.memory;
        }
        default:
            return state;
    }

}
