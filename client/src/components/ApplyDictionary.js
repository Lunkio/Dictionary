import React from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'semantic-ui-react'
import { DivWrapper, ApplyDictionaryStyle } from '../styles/styles'
import Dataset from './Dataset'
import { editData } from '../reducers/dataReducer'

const ApplyDictionary = (props) => {
    //console.log(props)

    if (props.editDictionary.length === 0) {
        return null
    }

    const apply = (valueSets) => {
        //console.log(valueSets)
        props.editData(valueSets)
    }

    return (
        <DivWrapper className='container'>
            <div style={{'textAlign': 'center', 'marginBottom': '2rem'}}>
                <h1>Dictionary to apply</h1>
                <h4>{props.editDictionary.name}</h4>
                <p>{props.editDictionary.description}</p>
                <hr />
            </div>
            <div className='row'>
                <ApplyDictionaryStyle className='col-lg-6 col-md-6 col-sm-12'>
                    <Table celled> 
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Domain</Table.HeaderCell>
                                <Table.HeaderCell>Range</Table.HeaderCell>
                                <Table.HeaderCell>Issues</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {props.editDictionary.valueSets.map((values, i) =>
                                <Table.Row key={i}>
                                    {values.map((v, i) =>
                                        <Table.Cell key={i}>{v}</Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </ApplyDictionaryStyle>
                <ApplyDictionaryStyle className='col-lg-6 col-md-6 col-sm-12'>
                    <Dataset />
                </ApplyDictionaryStyle>
            </div>
            <Button onClick={() => apply(props.editDictionary.valueSets)} color='blue' size='big' style={{'marginBottom': '2rem'}}>Apply</Button>
        </DivWrapper>
    )
}

const mapStateToProps = (state) => {
    return {
        datas: state.datas,
        editDictionary: state.editDictionary
    }
}

const mapDispatchToProps = {
    editData
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplyDictionary)