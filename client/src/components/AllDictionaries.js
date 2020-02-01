import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import services from '../services/services'
import { deleteDictionary } from '../reducers/dictionaryReducer'
import { editDictionary } from '../reducers/editReducer'
import { DivWrapper, DictionaryStyle, BtnContainer } from '../styles/styles'
import { Table, Button } from 'semantic-ui-react'
// import { checkForIssues } from '../services/validators'

const AllDictionaries = (props) => {
    //console.log(props.dictionaries)

    if (props.dictionaries.length === 0) {
        return (
            <DivWrapper style={{'textAlign': 'center'}}>
                <h2>No dictionaries, create one and they will appear here</h2>
            </DivWrapper>
        )
    }

    const remove = (dictionary) => {
        if (window.confirm(`Delete ${dictionary.name}?`)) {
            services.deleteDictionary(dictionary.id)
                .then(result => {
                    props.deleteDictionary(dictionary)
                })
                .catch(error => {
                    console.log(error)
                    window.alert('Dictionary was not removed, try again')
                })
        } else {
            return
        }
    }

    const applicable = (dictionary) => {
        let disabled = false
        dictionary.valueSets.forEach(values => {
            if (values[2] !== '-' && values[2] !== 'Duplicate value') {
                disabled = true
            }
        })
        return disabled
    }

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
            <div style={{'textAlign': 'center', 'marginBottom': '2rem'}}>
                <h1>Available Dictionaries</h1><hr/>
            </div>
            {/* <button onClick={() => checkForIssues(props.dictionaries[4])}>Validate</button> */}
            <div>
                {props.dictionaries.map((dictionary, i) => 
                    <div key={i}>
                        <DictionaryStyle>
                        <h4>{dictionary.name}</h4>
                        <p>{dictionary.description}</p>                        
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Domain</Table.HeaderCell>
                                        <Table.HeaderCell>Range</Table.HeaderCell>
                                        <Table.HeaderCell>Issues</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {dictionary.valueSets.map((values, i) => {
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
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                            <BtnContainer>
                                <Button 
                                    basic color='blue'
                                    style={{'height': '3rem'}}
                                    onClick={() => {props.editDictionary(dictionary)}}
                                    disabled={applicable(dictionary)}
                                >
                                    <Link to='/apply'>
                                        {applicable(dictionary) ? <p>Can't be applied</p> : <p>Apply to dataset</p>}
                                    </Link>
                                </Button>
                                <Link to='/edit'>
                                    <Button basic color='teal' style={{'height': '3rem'}} onClick={() => {props.editDictionary(dictionary)}}>Edit dictionary</Button>
                                </Link>
                                <Button basic color='red' style={{'height': '3rem'}} onClick={() => remove(dictionary)}>Remove dictionary</Button>
                            </BtnContainer>
                        </DictionaryStyle><hr />
                    </div>
                )}
            </div>
        </DivWrapper>
    )
}

const mapStateToProps = (state) => {
    return {
        dictionaries: state.dictionaries
    }
}

const mapDispatchToProps = {
    deleteDictionary,
    editDictionary
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllDictionaries)