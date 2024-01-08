
import { SideBar } from './main/components/SideBar';
import { NavBar } from './main/components/NavBar';
import { FilesTable } from './main/components/Drive/FilesTable';
import { Footer } from './main/components/Footer';
import { ListContainer } from './main/components/Trello/ListContainer';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Board } from './main/components/Conversor/Board';
import { Main } from './main/components/Tetris/components/Main';
import { CalendarMain } from './main/components/Calendar/CalendarMain';
import { SignIn } from './main/components/Login/SignIn';
import { Register } from './main/components/Login/Register';
import { OktaConfig } from './main/lib/OktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { Security, LoginCallback } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';

const oktaAuth = new OktaAuth(OktaConfig);

function App() {

  const customAuthHandler = () => {
    history.push('/login')
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin))
  }

  return (
    <div className='bg-gray-200 '>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <SideBar />
        <NavBar />
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <FilesTable />
          </Route>
          <Route path='/signIn'>
            <SignIn />
          </Route>
          <Route path='/signUp'>
            <Register />
          </Route>
          <Route path='/trello'>
            <ListContainer />
          </Route>
          <Route path='/conversor'>
            <Board />
          </Route>
          <Route path='/tetris'>
            <Main />
          </Route>
          <Route path='/calendar'>
            <CalendarMain />
          </Route>
          <Route path='/login' render={(

          ) => <LoginWidget config={OktaConfig} />} />
          <Route path='/login/callback' component={LoginCallback} />
        </Switch>
        <Footer />
      </Security>
    </div>

  );
}

export default App;
