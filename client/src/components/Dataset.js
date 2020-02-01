import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

const Dataset = (props) => {

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Color</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            
            <Table.Body>
                {props.datas.map((p, i) =>
                    <Table.Row key={i}>
                        <Table.Cell>{p.product}</Table.Cell>
                        <Table.Cell>{p.color}</Table.Cell>
                        <Table.Cell>{p.price}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}

const mapStateToProps = (state) => {
    return {
        datas: state.datas,
        editDictionary: state.editDictionary
    }
}

export default connect(mapStateToProps)(Dataset)