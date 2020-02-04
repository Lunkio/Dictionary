import React, {useState} from 'react'
import styled from 'styled-components'
import { DivWrapper, DictionaryStyleWide, FormStyle } from '../styles/styles'
import { Table, Button, Icon, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updatedEditDictionary } from '../reducers/editReducer'
import { updatedDictionary } from '../reducers/dictionaryReducer'
import { setAlert } from '../reducers/alertReducer'
import { setSuccess } from '../reducers/successReducer'
import services from '../services/services'
import { checkForIssues, letterCase } from '../services/validators'

const EditDictionary = (props) => {
    const [showTable, setShowTable] = useState(true)
    const [showEdit, setShowEdit] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showName, setShowName] = useState(true)
    const [showRename, setShowRename] = useState(false)

    const [newName, setNewName] = useState(props.editDictionary.name)

    const [newOriginal, setNewOriginal] = useState('')
    const [newDesired, setNewDesired] = useState('')
    const [oldValueSet, setOldValueSet] = useState(null)

    if (props.editDictionary.length === 0) {
        return null
    }

    const close = () => {
        setShowTable(true)
        setShowEditForm(false)
        setShowEdit(false)
        setShowName(true)
    }

    const showValueSet = (valueSet) => {
        setOldValueSet(valueSet)
        setNewOriginal(valueSet[0])
        setNewDesired(valueSet[1])
        setShowEditForm(true)
        setShowTable(false)
        setShowEdit(true)
        setShowName(false)
        setShowRename(false)
    }

    const setName = () => {
        setShowName(false)
        setShowRename(true)
    }

    const closeRename = () => {
        setShowName(true)
        setShowRename(false)
    }

    const renameDictionary = (event) => {
        event.preventDefault()
        const renamedDictionary = {
            name: newName,
            description: props.editDictionary.description,
            valueSets: props.editDictionary.valueSets
        }
        services.putDictionary(props.editDictionary.id, renamedDictionary)
            .then(result => {
                props.setSuccess('Dictionary renamed successfully', 3)
                props.updatedEditDictionary(result)
                props.updatedDictionary(result)
                setShowRename(false)
                setShowName(true)
                setNewName(newName)
            })
            .catch(error => {
                console.log(error)
                props.setAlert('Something went wrong, please try again', 3)
            })
    }

    const addValues = (event) => {
        event.preventDefault()
        event.persist()

        const original = event.target.original.value
        const desired = event.target.desired.value

        if (original === '' || desired === '') {
            props.setAlert('Value can not be empty', 3)
            return
        }

        //Sets first character of a word as uppercase
        const originalToCase = letterCase(original)
        const desiredToCase = letterCase(desired)

        //copies valueSets from this dictionary
        const newValueSets = JSON.parse(JSON.stringify(props.editDictionary.valueSets))

        //adds new values to new valueSets
        newValueSets.push([originalToCase, desiredToCase])

        //creates new dictionary with new values
        const updatedValuesDictionary = {
            name: props.editDictionary.name,
            description: props.editDictionary.description,
            valueSets: newValueSets
        }

        //checks for dictionary consistency
        checkForIssues(updatedValuesDictionary)

        services.putDictionary(props.editDictionary.id, updatedValuesDictionary)
            .then(result => {
                props.setSuccess('New values added', 3)
                props.updatedEditDictionary(result)
                props.updatedDictionary(result)
                event.target.original.value = ''
                event.target.desired.value = ''
            })
            .catch(error => {
                console.log(error)
                props.setAlert('Something went wrong, please try again', 3)
            })
    }

    const editValueSet = (event) => {
        event.preventDefault()
        if (newOriginal === '' || newDesired === '') {
            props.setAlert('Value can not be empty', 3)
            return
        }
        
        //copies valueSets from this dictionary
        const newValues = JSON.parse(JSON.stringify(props.editDictionary.valueSets))
        //removes old valueSet so new edited can be added instead
        const index = props.editDictionary.valueSets.indexOf(oldValueSet)
        newValues.splice(index, 1)

        //Sets first character of a word as uppercase
        const originalToCase = letterCase(newOriginal)
        const desiredToCase = letterCase(newDesired)

        //new edited values added
        newValues.push([originalToCase, desiredToCase])

        const updatedValuesDictionary = {
            name: props.editDictionary.name,
            description: props.editDictionary.description,
            valueSets: newValues
        }

        //checks for dictionary consistency
        checkForIssues(updatedValuesDictionary)

        services.putDictionary(props.editDictionary.id, updatedValuesDictionary)
            .then(result => {
                props.setSuccess('Values updated succesfully', 3)
                props.updatedEditDictionary(result)
                props.updatedDictionary(result)
                setShowEditForm(false)
                setShowTable(true)
            })
            .catch(error => {
                console.log(error)
                props.setAlert('Something went wrong, please try again', 3)
            })
    }

    const removeValueSet = (valueSet) => {
        //copies valueSets from this dictionary
        const newValues = JSON.parse(JSON.stringify(props.editDictionary.valueSets))
        //removes old valueSet
        const index = props.editDictionary.valueSets.indexOf(valueSet)
        newValues.splice(index, 1)

        const updatedValuesDictionary = {
            name: props.editDictionary.name,
            description: props.editDictionary.description,
            valueSets: newValues
        }

        //checks for dictionary consistency
        checkForIssues(updatedValuesDictionary)

        services.putDictionary(props.editDictionary.id, updatedValuesDictionary)
            .then(result => {
                props.setSuccess('Values removed succesfully', 3)
                props.updatedEditDictionary(result)
                props.updatedDictionary(result)
            })
            .catch(error => {
                console.log(error)
                props.setAlert('Something went wrong, please try again', 3)
            })
    }

    const tableShow = { display: showTable ? '' : 'none' }
    const editShow = { display: showEdit ? '' : 'none' }
    const editFormShow = { display: showEditForm ? '' : 'none' }
    const renameShow = { display: showRename ? '' : 'none' }
    const dictionaryNameShow = { display: showName ? '' : 'none' }

    const noIssuesStyle = { backgroundColor: '#ffffff'}
    const duplicateStyle = { backgroundColor: '#fffaf3' }
    const forkStyle = { backgroundColor: '#ffb3b3' }
    const cycleStyle = { backgroundColor: '#ffb3b3' }
    const chainStyle = { backgroundColor: '#ffb3b3' }
    const manyIssuesStyle = { backgroundColor: '#ff6666' }
    const noIssuesIcon = ''
    const duplicateIcon = 'far fa-clone'
    const cycleIcon = 'fas fa-sync-alt'
    const forkIcon = 'fas fa-random'
    const chainIcon = 'fas fa-link'
    const issuesIcon = 'fas fa-exclamation-triangle'

    return (
        <DivWrapper className='container'>
            <div style={{'marginBottom': '2rem','textAlign': 'center', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-evenly'}}>
                <h1>Edit Dictionary</h1>
                <Link to='/available'>
                    <Button color='teal'>Go Back to Available Dictionaries</Button>
                </Link>
            </div>
            <hr />
            <DictionaryStyleWide>
                <div>
                    <NameDiv style={dictionaryNameShow}>
                        <h4>{props.editDictionary.name}</h4>
                        <Button id='renameBtn' onClick={setName} basic color='brown'>Rename</Button>
                    </NameDiv>
                    <form onSubmit={renameDictionary} style={renameShow}>
                        <div className='form-row'>
                            <div className='form-group col-md-5'>
                                <input id='renameInput' type='text' value={newName} onChange={({ target }) => setNewName(target.value)} className='form-control' />
                            </div>
                        </div>
                        <button id='submitRename' type='submit' className='btn btn-success'>Apply</button>
                        <div onClick={closeRename} className='btn btn-outline-secondary'>Cancel</div>
                    </form>
                </div>
                <p>{props.editDictionary.description}</p>
                <Table celled style={tableShow}> 
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Domain</Table.HeaderCell>
                            <Table.HeaderCell>Range</Table.HeaderCell>
                            <Table.HeaderCell>Issues / Edit values</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                        <Table.Body>
                            {props.editDictionary.valueSets.map((values, i) => {
                                let alert, icon
                                if (values[2] === 'Duplicate value') {
                                    alert = duplicateStyle
                                    icon = duplicateIcon
                                } else if (values[2] === 'Fork value') {
                                    alert = forkStyle
                                    icon = forkIcon
                                } else if (values[2] === 'Cycle value') {
                                    alert = cycleStyle
                                    icon = cycleIcon
                                } else if (values[2] === 'Chain value') {
                                    alert = chainStyle
                                    icon = chainIcon
                                } else if (values[2] === '-') {
                                    alert = noIssuesStyle
                                    icon = noIssuesIcon 
                                } else {
                                    alert = manyIssuesStyle
                                    icon = issuesIcon
                                }
                                return (
                                    <Table.Row key={i}>
                                        {values.map((v, id) => {
                                            //console.log(v)
                                            return (
                                                <Table.Cell key={id} style={alert}>{v} <i className={icon}/></Table.Cell>
                                            )
                                        })}
                                        <Table.Cell className='btn btn-info' style={{'cursor': 'pointer', 'width': '50%'}} onClick={() => showValueSet(values)}>Edit</Table.Cell>
                                        <Table.Cell className='btn btn-danger' style={{'cursor': 'pointer', 'width': '50%'}} onClick={() => removeValueSet(values)}>Remove</Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                </Table>
                {(props.success && <Message positive><Message.Header>{props.success}</Message.Header></Message>)}
                {(props.alert && <Message negative><Message.Header>{props.alert}</Message.Header></Message>)}
                
                <form onSubmit={addValues} style={tableShow}>
                    <hr />
                    <h2>Add values</h2>
                    <div className='form-row' style={{'alignItems': 'start', 'justifyContent': 'space-between'}}>
                        <div className='form-group col-md-5'>
                            <label>Original value</label>
                            <input id='originalAddId' type='text' name='original' placeholder='Original value' className='form-control' />
                        </div>
                        <div className='form-group col-md-5'>
                            <label>Desired value</label>
                            <input id='desiredAddId' type='text' name='desired' placeholder='Desired value' className='form-control' />
                        </div>
                        <button id='addBtn' type='submit' className='btn btn-success' style={{'alignSelf': 'center', 'marginTop': '0.9rem'}}>Add <Icon name='add square'/></button>
                    </div>
                </form>
            </DictionaryStyleWide>

            {/* Edit values */}
            <div style={editShow}>
                <FormStyle>
                    <form onSubmit={editValueSet} style={editFormShow}>
                        <div className='form-row' style={{'alignItems': 'start', 'justifyContent': 'space-between'}}>
                            <div className='form-group col-md-5'>
                                <input id='originalEditId' type='text' value={newOriginal} onChange={({ target }) => setNewOriginal(target.value)} className='form-control' />
                            </div>
                            <div className='form-group col-md-5'>
                                <input id='desiredEditId' type='text' value={newDesired} onChange={({ target }) => setNewDesired(target.value)} className='form-control' />
                            </div>
                            <button id='applyEdit' type='submit' className='btn btn-success' style={{'alignSelf': 'center', 'marginBottom': '1rem'}}>Apply changes</button>
                        </div>
                        <div id='backBtn' className='btn btn-outline-info' onClick={close} style={{'marginBottom': '3rem'}}>Back</div>
                    </form>
                </FormStyle>
            </div>
        </DivWrapper>
    )
}

const NameDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const mapStateToProps = (state) => {
    return {
        editDictionary: state.editDictionary,
        alert: state.alert,
        success: state.success
    }
}

const mapDispatchToProps = {
    updatedEditDictionary,
    updatedDictionary,
    setSuccess,
    setAlert
}
 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditDictionary)