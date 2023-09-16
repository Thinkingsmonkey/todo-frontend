import Task from "./Task";
import { v4 as uuidv4 } from "uuid";
const TaskList = ({ handleEdit, setTasks, filterTasks }) => {
  
  return (
    <ul className="task-list pt-3d75 d-flex flex-wrap justify-content-md-between justify-content-center gap-2d25">
      {filterTasks.map((task) => (
        <li key={uuidv4()} className="d-flex">
          <Task  setTasks={setTasks} handleEdit={handleEdit} task={task} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
