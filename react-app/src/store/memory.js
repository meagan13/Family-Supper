const GET_MEMORIES = 'memory/GET_MEMORIES';
const ADD_MEMORY = 'memory/ADD_MEMORY';

const loadMemories = (memories) => {
    return {
        type: GET_MEMORIES,
        memories
    }
}

const addMemory = (memory) => {
    return {
        type: ADD_MEMORY,
        memory
    }
}

export const getMemories = () => async(dispatch) => {
    const res = await fetch('/api/memory/');

    if (res.ok) {
        const memories = await res.json();
        await dispatch()
    }
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

const initialState = {}

export default function memories(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_MEMORY: {
            newState = {...state};
            newState.memories.push(action.memory);
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
        default:
            return state;
    }

}
