import { useState } from "react";
import { useAuth } from "./AuthContext";

const Edit = ({ tasks, setTasks, taskInfo, setShowEdit }) => {
  const { memberId, csrf_access_token } = useAuth();

  const [editedTaskInfo, setEditedTaskInfo] = useState({ ...taskInfo }); // 使用狀態來管理編輯後的任務資訊

  const handleChange = (e) => {
    setEditedTaskInfo((preEditedTaskInfo) => ({
      ...preEditedTaskInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddTask = async () => {
    try {
      if (editedTaskInfo.title === null || editedTaskInfo.title === "") {
        throw new Error("Title should not be empty");
      }

      // 給後端正確的 空值
      const newTaskInfo = {};
      for (const key in editedTaskInfo) {
        if (editedTaskInfo.hasOwnProperty(key)) {
          newTaskInfo[key] =
          editedTaskInfo[key] === "" ? null : editedTaskInfo[key];
        }
      }
      const apiUrl = process.env.REACT_APP_API_URL;
      const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRF-TOKEN': csrf_access_token, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTaskInfo, member_id: memberId }),
      };
      const response = await fetch(apiUrl + "/tasks", options);

      const data = await response.json();
      const newTasks = [...tasks, data];
      setTasks(newTasks);
      setShowEdit(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditTask = async () => {
    try {
      const options = {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'X-CSRF-TOKEN': csrf_access_token, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTaskInfo),
      };
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(apiUrl + "/tasks/" + editedTaskInfo.id, options);
      const data = await response.json();
      
      const newTasks = tasks.map((task) => {
        if (task.id === data.id) return { ...task, ...data };
        return task;
      });
      setTasks(newTasks);
      if (!response.ok) throw new Error("delete dose not complate");
    } catch (error) {
      console.log(error.message);
    }

    setShowEdit(false);
  };
  const handleCloseEdit = (e) => {
    if (!e.target.closest(".edit")) setShowEdit(false);
  };

  return (
    <div onClick={(e) => handleCloseEdit(e)} className="edit-container">
      <div className="container edit bg-white py-3d5 px-4d5 d-flex flex-column gap-1d25 text-filed">
        <div className="edit__head d-flex justify-content-between">
          <div className="edit__title w-100 ">
            <h2 className="fw-bold mb-d25">TITLE</h2>
            <input
              className=" border border-2 border-filed rounded-pill p-d5 w-100"
              placeholder="Your Task Title"
              type="text"
              value={editedTaskInfo.title}
              name="title"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="edit__body d-flex justify-content-between flex-wrap gap-1 ">
          <div className="edit__priority w-45">
            <h2 className="fw-bold mb-d25">PRIORITY</h2>
            <select
              className=" border border-2 border-filed rounded-pill p-d5 w-100"
              value={editedTaskInfo.priority || "Medium"}
              name="priority"
              onChange={(e) => handleChange(e)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="edit__state w-45">
            <h2 className="fw-bold mb-d25">STATE</h2>
            <select
              className=" border border-2 border-filed rounded-pill p-d5 w-100"
              value={editedTaskInfo.state}
              name="state"
              onChange={(e) => handleChange(e)}
            >
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="edit__start w-45">
            <h2 className="fw-bold mb-d25">START</h2>
            <input
              className=" border border-2 border-filed rounded-pill p-d5 w-100"
              placeholder="Select"
              type="date"
              value={editedTaskInfo.start}
              name="start"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="edit__deadline w-45">
            <h2 className="fw-bold mb-d25">DEADLINE</h2>
            <input
              className=" border border-2 border-filed rounded-pill p-d5 w-100"
              placeholder="Select"
              type="date"
              value={editedTaskInfo.deadline}
              name="deadline"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="edit__footer text-center ">
          <div className="edit__descript mb-1d25">
            <h2 className="fw-bold text-start mb-d25">DESCRIPTION</h2>
            <textarea
              className="border border-2 border-filed rounded-pill w-100 p-1 pt-d5"
              cols="30"
              rows="10"
              placeholder="Your Task"
              value={editedTaskInfo.description}
              name="description"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          {taskInfo.method === "add" ? (
            <p className="btn btn-primary mx-auto" onClick={handleAddTask}>
              Add Task
            </p>
          ) : (
            <p className="btn btn-primary mx-auto" onClick={handleEditTask}>
              Edit Task
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
