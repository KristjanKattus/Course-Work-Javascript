
import { Redirect, Route, Switch } from 'react-router-dom'
import { AppContextProvider, initialAppState } from './context/AppContext'
import LoginLayout from './LoginLayout'
import MainLayout from './MainLayout'
import { useState } from 'react'
// views
import Home from './containers/home/HomeIndex'
import Login from './containers/identity/Login'
import Register from './containers/identity/Register'
import Privacy from './components/Privacy'
import LeagueTableIndex from './containers/LeagueTable/Index'
import GameEventCreate from './containers/GameEvent/Create'
import GameDetails from './containers/Game/Details'




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
                                <Route path='/LeagueTable/:id' exact component={LeagueTableIndex}/>
                                <Route path='/GameEvent/:id' exact component={GameEventCreate}/>
                                <Route path='/Game/Details/:id'exact component={GameDetails}/>                
                            </MainLayout>
                        </Route>

                    </Switch>
            </AppContextProvider>
        </>
    )
};

export default App;