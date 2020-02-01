import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import { BtnContainer } from './styles/styles'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { initData } from './reducers/dataReducer'
import { initDictionaries } from './reducers/dictionaryReducer'
import services from './services/services'
import Example from './components/Example'
import Home from './components/Home'
import CreateDictionary from './components/CreateDictionary'
import AllDictionaries from './components/AllDictionaries'
import EditDictionary from './components/EditDictionary'
import ApplyDictionary from './components/ApplyDictionary'

const App = (props) => {

    useEffect(() => {
        services.getAllData()
            .then(result => {
                props.initData(result)
            })
        services.getAllDictionary()
            .then(result => {
                props.initDictionaries(result)
            })
    }, [])
    
    return (
        <React.Fragment>
            <Router>
                <div className='container'>
                    <NavBar>
                        <BtnContainer>
                            <Link to='/'>
                                <Button size='big' color='violet'>Home</Button>
                            </Link>
                            <Link to='/create'>
                                <Button size='big' color='violet'>Create Dictionary</Button>
                            </Link>
                            <Link to='/available'>
                                <Button size='big' color='violet'>Available Dictionaries</Button>
                            </Link>
                            <Link to='/dataset'>
                                <Button size='big' color='violet'>Example Dataset</Button>
                            </Link>
                        </BtnContainer>
                    </NavBar>
                </div>
            
                <Route exact path='/' render={() => <Home />} />
                <Route path='/dataset' render={() => <Example />} />
                <Route path='/create' render={() => <CreateDictionary />} />
                <Route path='/available' render={() => <AllDictionaries /> } />
                <Route path='/edit' render={() => <EditDictionary /> } />
                <Route path='/apply' render={() => <ApplyDictionary />} />
            </Router>
        </React.Fragment>
    )
}

const NavBar = styled.nav`
    margin-top: 1rem;
`

export default connect(null, { initData, initDictionaries })(App)