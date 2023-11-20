
import { SideBar } from './main/components/SideBar';
import { NavBar } from './main/components/NavBar';
import { FilesTable } from './main/components/Drive/FilesTable';
import { Footer } from './main/components/Footer';
import { ListContainer } from './main/components/Trello/ListContainer';

function App() {
  return (
    <div className='bg-gray-200' style={{height:"100vh"}}>
      <NavBar />
      <SideBar />
     <ListContainer/>
      <Footer />
    </div>

  );
}

export default App;
