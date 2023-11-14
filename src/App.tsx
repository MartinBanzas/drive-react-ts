
import { SideBar } from './main/components/SideBar';
import { NavBar } from './main/components/NavBar';
import { FilesTable } from './main/components/FilesTable';
import { Footer } from './main/components/Footer';

function App() {
  return (
    <div className='bg-gray-200'>
      <NavBar />
      <SideBar />
      <FilesTable />
      <Footer />
    </div>

  );
}

export default App;
