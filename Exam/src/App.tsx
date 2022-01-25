
import { Redirect, Route, Switch } from 'react-router-dom'
import { AppContextProvider, initialAppState } from './context/AppContext'
import LoginLayout from './LoginLayout'
import MainLayout from './MainLayout'
import { useState } from 'react'
// views
import Home from './containers/home/HomeIndex'
import CategoryDetails from "./containers/Category/Details"
import Login from './containers/identity/Login'
import Register from './containers/identity/Register'
import Privacy from './components/Privacy'
import HomeIndex from './containers/home/HomeIndex'
import QuizEdit from "./containers/Quiz/Edit"
import QuestionCreate from "./containers/Question/Create"



const App = () => {
    const setAuthInfo = (token: string | null, firstName: string, lastName: string, role:string): void => {
        setAppState({ ...appState, token, firstName, lastName, role });
    }

    const [appState, setAppState] = useState({ ...initialAppState, setAuthInfo });

    return (
        <>
            <AppContextProvider value={appState} >
                    <Switch>

                        <Route path='/Identity' >
                            <LoginLayout>
                                <Switch>
                                    <Route path='/Identity/Login' exact component={Login} />
                                    <Route path='/Identity/Register' exact component={Register} />
                                </Switch>
                            </LoginLayout>
                        </Route>

                        <Route>
                            <MainLayout>
                                <Route path='/' exact component={Home} />
                                <Route path='/Privacy' exact component={Privacy} />
                                <Route path='/Home/Index' exact component={HomeIndex} />
                                <Route path='/Category/:id' exact component={CategoryDetails} />
                                <Route path='/Question/Create/:id' exact component={QuestionCreate} />
                                <Route path='/Quiz/:id' exact component={QuizEdit} />
                            </MainLayout>
                        </Route>

                    </Switch>
            </AppContextProvider>
        </>
    )
};

export default App;