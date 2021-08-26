import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMemories } from '../../store/memory';
import './AllMemories.css'

function Memories() {
    const dispatch = useDispatch()

    const stateCheck = useSelector((state) => Object.values(state?.recipes))

    console.log("state check:", stateCheck)

    useEffect(() => {
        dispatch(getMemories())
    }, [dispatch])

    return (
        <>
            <h1>Memories</h1>
            {/* { memories.map(memory => (
                <p>
                    {memory.memory_text}
                </p>
            )) } */}

        </>
    )


}

export default Memories;
