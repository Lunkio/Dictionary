import React from 'react'
import { connect } from 'react-redux'
import { DivWrapper } from '../styles/styles'

const Home = (props) => {
    //console.log(props)
    
    return (
        <DivWrapper className='container'>
            <div style={{'textAlign': 'center'}}>
                <h1>Dictionary Management Application</h1>
                <hr></hr>
            </div>
            <div style={{'textAlign': 'center'}}>
                <h2>Statistics:</h2>
                    <h3><strong>{props.dictionaries.length}</strong> available dictionaries</h3>
                    <h3><strong>{props.datas.length}</strong> dataset rows</h3>
            </div>
        </DivWrapper>
    )
}

const mapStateToProps = (state) => {
    return {
        datas: state.datas,
        dictionaries: state.dictionaries
    }
}

export default connect(
    mapStateToProps
)(Home)