import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Main from "../components/Main/Main";
import { useNavigate } from "react-router-dom";
import Edit from "../components/Edit";
import { useAuth } from "../components/AuthContext";


function Home() {
  const { isLoggedIn, logout, memberId, csrf_access_token } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]); // 監控 tasks 狀態
  const [showEdit, setShowEdit] = useState(false);
  const [taskInfo, setTaskinfo] = useState({
    title: "",
    priority: "Medium",
    state: "Todo",
    start: "",
    deadline: "",
    description: "",
    method: "", // edit or add task
  });
  const handleEdit = (newTaskInfo) => {
    setTaskinfo((preTaskInfo) => ({ ...preTaskInfo, ...newTaskInfo }));
    setShowEdit(true);
  };

  let isPanding = false;

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          credentials: 'include', 
          headers: {
            'X-CSRF-TOKEN': csrf_access_token, 
            'Content-Type': 'application/json',
          },
        };
        const apiUrl = process.env.REACT_APP_API_URL;
        let url = `${apiUrl}/member/${memberId}/tasks`;
        const response = await fetch(url, options);
        if (response.status === 401) logout()
        if (response.ok !== true)
          throw new Error("Fetch does not success: " + `${response.status}`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isPanding ? (
        <h2>Panding...</h2>
      ) : (
        isLoggedIn && (
          <>
            <Header
              tasks={tasks}
              setTasks={setTasks}
              handleEdit={handleEdit}
              setShowEdit={setShowEdit}
            />
            <Main
              handleEdit={handleEdit}
              tasks={tasks}
              setTasks={setTasks}
            />
            {showEdit && (
              <Edit
                tasks={tasks}
                setTasks={setTasks}
                taskInfo={taskInfo}
                setShowEdit={setShowEdit}
              />
            )}
          </>
        )
      )}
    </div>
  );
}

export default Home;
