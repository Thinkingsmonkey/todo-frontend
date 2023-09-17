import { useState } from "react";
import { useAuth } from '../AuthContext';
import moreImage from "../../images/moreDot.png";

const Banner = ({ handleEdit, tasks, setTasks, setShowEdit }) => {
  const { memberId, csrf_access_token } = useAuth();
  const [title, setTitle] = useState(""); // 因為 react 需要設為空字串，所以判斷是否為空還需要另外寫
  const handleOpenEdit = () => {
    handleEdit({ title, method: "add",
        priority: "", //  因為 react 需要設為空字串，所以判斷是否為空還需要另外寫
        state: "",
        start: "",
        deadline: "",
        description: "",
  
  });
  };
  const handleAddTask = async () => {
    try {
      if (title === null || title === "")  throw new Error("Title should not be empty")
      const requestData = {
        member_id: memberId,
        title: title,
        priority: null, // 要傳給後端無資料的要確實給 null
        state: null,
        start: null,
        deadline: null,
        description: null,
      };


      const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRF-TOKEN': csrf_access_token, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      };
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(apiUrl + "/tasks", options);
  
      const data = await response.json();
      const newTasks = [...tasks, data];
      setTasks(newTasks);
      setShowEdit(false);
      setTitle("")
    } catch (error) {
      alert(error.message)
    }
  };
  return (
    <div className="banner pb-3 d-block text-center">
      <h1 className="fs-1 mb-1d5">Todo</h1>
      <div className="add-group">
        <input
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          className="add-group__input"
          type="text"
          placeholder="Add yout task"
        />
        <button className=" border-0" onClick={handleOpenEdit}>
          <img className="add-group__more" src={moreImage} alt="more config" />
        </button>
        <button onClick={handleAddTask} className="add-group__addBtn">
          <p className="text-text">Add Task</p>
        </button>
      </div>
    </div>
  );
};

export default Banner;
