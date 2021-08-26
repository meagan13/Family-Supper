import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMemories, getMemoriesByRecipeThunk } from '../../store/memory';
import './AllMemories.css'

function Memories() {
    const dispatch = useDispatch()

    const memories = useSelector((state) => (state?.memories))

    const { recipeId } = useParams();
    // const recipes = useSelector((state) => Object.values(state?.recipes))
    // console.log("state", stateCheck)
    console.log("memories:", memories)

    console.log("Memories recipeId:", recipeId)
    useEffect(() => {
        dispatch(getMemories())
    }, [dispatch])

    useEffect(() => {
        dispatch(getMemoriesByRecipeThunk(recipeId))
    }, [dispatch])

    return (
        <>
            <h1>Memories</h1>
            { Object.values(memories)?.map(memory => (
                <>
                    <h3>{memory.recipe_id}</h3>
                    <p>
                        {memory?.memory_text}
                    </p>
                </>
            )) }

        </>
    )


}

export default Memories;
