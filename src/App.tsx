
import { SideBar } from './main/components/SideBar';
import { NavBar } from './main/components/NavBar';
import { FilesTable } from './main/components/Drive/FilesTable';
import { Footer } from './main/components/Footer';
import { ListContainer } from './main/components/Trello/ListContainer';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Board } from './main/components/Conversor/Board';


function App() {
  return (
    <div className='bg-gray-200 '>
      <NavBar />
      <SideBar />
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <Route path='/home'>
          <FilesTable />
        </Route>
        <Route path='/trello'>
          <ListContainer />
        </Route>
        <Route path='/conversor'>
          <Board/>
        </Route>
        <Route path='/tetris'>
        </Route>
      </Switch>
      <Footer />
    </div>

  );
}

export default App;
