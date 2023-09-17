import { useState } from "react";
import Filters from "./Filters";
import TaskList from "./TaskList";
const Main = ({ handleEdit, tasks, setTasks }) => {
  const [filter, setFilter] = useState(null);
  let filterTasks = tasks.slice().reverse();

  if (filter === "Done") {
    filterTasks = filterTasks.filter((task) => task.state === "Done");
  }

  if (filter === "Priority") {
    filterTasks = filterTasks.slice().sort((a, b) => {
      // 將 "High" 排在前面，其次是 "Medium"，最後是 "Low"
      const priorityOrder = {
        High: 0,
        Medium: 1,
        Low: 2,
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  if (filter === "Today") {
    const today = new Date();
    const todayFormat = today.toISOString().split("T")[0];
    filterTasks = filterTasks.filter((task) => {
      const taskStartFormat = task.start.split("T")[0];
      return taskStartFormat === todayFormat;
    });
  }

  return (
    <main className="bg-bg-primary main">
      <div className="container d-flex flex-wrap py-3d75 ">
        <Filters setFilter={setFilter} />
        <TaskList
          filterTasks={filterTasks}
          setTasks={setTasks}
          handleEdit={handleEdit}
        />
      </div>
    </main>
  );
};

export default Main;
