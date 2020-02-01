import React from 'react'
import Dataset from './Dataset'
import { DivWrapper } from '../styles/styles'

const Example = () => {
    return (
        <DivWrapper className='container'>
            <div style={{'textAlign': 'center'}}>
                <hr/>
                <h3>Dataset for dictionary testing</h3>
                <p>Create a dictionary or choose from the available dictionaries and apply to this dataset to see changes in 'color' column.</p>
                <Dataset />
            </div>
        </DivWrapper>
    )
}

export default Example