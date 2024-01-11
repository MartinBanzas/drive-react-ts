
import { SideBar } from './main/components/SideBar';
import { NavBar } from './main/components/NavBar';
import { FilesTable } from './main/components/Drive/FilesTable';
import { Footer } from './main/components/Footer';
import { ListContainer } from './main/components/Trello/ListContainer';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Board } from './main/components/Conversor/Board';
import { Main } from './main/components/Tetris/components/Main';
import { CalendarMain } from './main/components/Calendar/CalendarMain';
import { SignIn } from './main/components/Login/SignIn';
import { Register } from './main/components/Login/Register';
import './assets/css/nucleo-icons.css'
import './assets/css/nucleo-svg.css'
import './assets/css/material-dashboard.css'

function App() {

  return (
    <div className='bg-gray-200'>
       <SideBar/> 
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
        </Switch>
        <Footer />
    </div>
  );
}

export default App;
