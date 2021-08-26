import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMemories } from '../../store/memory';
import './AllMemories.css'

function Memories() {
    const dispatch = useDispatch()

    const stateCheck = useSelector((state) => state.session)
    const memories = useSelector((state) => (state?.memories))
    // const recipes = useSelector((state) => Object.values(state?.recipes))
    console.log("state", stateCheck)
    console.log("memories:", memories)

    useEffect(() => {
        dispatch(getMemories())
    }, [dispatch])

    return (
        <>
            <h1>Memories</h1>
            { Object.values(memories)?.map(memory => (
                <p>
                    {memory?.memory_text}
                </p>
            )) }

        </>
    )


}

export default Memories;
