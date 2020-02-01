import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addDictionary } from '../reducers/dictionaryReducer'
import { setAlert } from '../reducers/alertReducer'
import { setSuccess } from '../reducers/successReducer'
import services from '../services/services'
import styled from 'styled-components'
import { DivWrapper, FormStyle } from '../styles/styles'
import { Icon, Message } from 'semantic-ui-react'
import { checkForIssues, letterCase } from '../services/validators'

const CreateDictionary = (props) => {
    const [original, setOriginal] = useState('')
    const [desired, setDesired] = useState('')
    const [values, setValues] = useState([])

    const addValue = () => {
        if (original === '' || desired === '') {
            props.setAlert(`Value can not be empty`, 3)
            return
        }
        const originalToCase = letterCase(original)
        const desiredToCase = letterCase(desired)
        const valueSet = [originalToCase, desiredToCase]

        setValues([...values, valueSet])
        setOriginal('')
        setDesired('')
    }

    const removeValue = (value) => {
        const newValues = values
        const index = values.indexOf(value)
        newValues.splice(index, 1)
        setValues([...newValues])
    }

    const dictionaryDetails = (event) => {
        event.preventDefault()
        event.persist()

        const name = event.target.name.value
        const description = event.target.description.value

        if (name === '') {
            props.setAlert('Dictionary needs a name', 5)
            return
        }

        // confirm this?
        const newDictionary = {
            name: name,
            description: description,
            valueSets: []
        }

        for (let i = 0; i < values.length; i++) {
            newDictionary.valueSets.push(values[i])
        }

        if (newDictionary.valueSets.length === 0) {
            props.setAlert('Dictionary needs at least one value', 5)
            return
        }

        checkForIssues(newDictionary)

        services.postDictionary(newDictionary)
            .then(result => {
                props.setSuccess('Dictionary added successfully!', 5)
                event.target.name.value = ''
                event.target.description.value = ''
                setValues([...[]])
                props.addDictionary(result)
            })
            .catch(error => {
                console.log(error)
                props.setAlert('Something went wrong, please try again', 5)
            })
    }

    return (
        <DivWrapper className='container'>
            <FormStyle>
                <h1>Create Dictionary</h1><hr/>
                {(props.success && <Message positive><Message.Header><h2>{props.success}</h2></Message.Header></Message>)}
                {(props.alert && <Message negative><Message.Header>{props.alert}</Message.Header></Message>)}
                <form onSubmit={dictionaryDetails}>
                    <div className='form-row'>
                        <div className='form-group col-md-6'>
                            <label>Name</label>
                            <input type='text' name='name' placeholder='Name of the dictionary' required className='form-control' />
                        </div>
                        <div className='from-group col-md-6'>
                            <label>Description</label>
                            <input type='text' name='description' placeholder='Description (optional)' className='form-control' />
                        </div>
                    </div>
                    <hr />
                        <div className='form-row' style={{'alignItems': 'start', 'justifyContent': 'space-between'}}>
                            <div className='form-group col-md-5'>
                                <label>Original value</label>
                                <input type='text' value={original} onChange={({ target }) => setOriginal(target.value)} name='original' placeholder='Original value' className='form-control' />
                            </div>
                            <div className='from-group col-md-5'>
                                <label>Desired value</label>
                                <input type='text' value={desired} onChange={({ target }) => setDesired(target.value)} name='desired' placeholder='Desired value' className='form-control' />
                            </div>
                            <div onClick={addValue} className='btn btn-success' style={{'alignSelf': 'center', 'marginTop': '0.9rem'}}>Add <Icon name='add square'/></div>
                        </div>
                    <hr />
                    
                    {values.map((value, i) =>
                        <div style={{'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center'}} key={i}>
                            <div>{`Original: `}<strong>{value[0]}</strong>{`,  Desired: `}<strong>{value[1]}</strong></div>
                            <RemoveBtn className='btn' onClick={() => removeValue(value)}><Icon name='remove'/></RemoveBtn>
                        </div>
                    )}
                    <hr />
                    <CreateDiv>
                        <p>When all the values are added, press "Create" -button to create a new dictionary with given values.</p>
                        <button type='submit' className='btn btn-primary' style={{'width': '9rem'}}>Create</button>
                    </CreateDiv>
                </form>
            </FormStyle>
        </DivWrapper>
    )
}

const RemoveBtn = styled.div`
    color: red;
    width: 1.2rem;
`

const CreateDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 3rem;
`

const mapStateToProps = (state) => {
    return {
        alert: state.alert,
        success: state.success
    }
}

const mapDispatchToProps = {
    addDictionary,
    setAlert,
    setSuccess
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateDictionary)