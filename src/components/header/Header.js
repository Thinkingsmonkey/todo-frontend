import Banner from "./Banner";
import Navbar from "./Navbar";
const Header = ({ tasks, setTasks, handleEdit, setShowEdit }) => {

  return ( 
    <header className="bg-secondary">
      <Navbar  />
      <Banner setShowEdit={setShowEdit} tasks={tasks} setTasks={setTasks} handleEdit={handleEdit}/> 
    </header>
  );
}

export default Header
;