import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
const API = "http://localhost:3001/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    axios.get(API).then(res => setTasks(res.data));
  }, []);

  // ADD TASK
  const addTask = async () => {
    const newTask = { text, user, status: "todo" };
    const res = await axios.post(API, newTask);
    setTasks([...tasks, res.data]);
    setText(""); 
    setUser("");
  };

  // DELETE
  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  };

  // DRAG
  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const updated = [...tasks];
    const task = updated.find(t => t.id == result.draggableId);
    task.status = result.destination.droppableId;
    setTasks(updated);

    await axios.put(`${API}/${task.id}`, task);
  };

  return (
    <div>
      <h2>Task Dashboard</h2>
      <input placeholder="Task" value={text} onChange={e => setText(e.target.value)} />
      <input placeholder="User" value={user} onChange={e => setUser(e.target.value)} />
      <button onClick={addTask}>Add</button>

      <DragDropContext onDragEnd={onDragEnd}>
        {["todo", "inprogress", "done"].map(status => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
               <div ref={provided.innerRef} {...provided.droppableProps}>
                 <h3>{status}</h3>
                 {tasks
                   .filter(t => t.status === status)
                   .map((t, i) => (
                     <Draggable key={t.id.toString()} draggableId={t.id.toString()} index={i}>
                       {(provided) => (
                         <div
                           ref={provided.innerRef}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}
                         >
                           <p>{t.text} - {t.user}</p>
                           <button onClick={() => deleteTask(t.id)}>Delete</button>
                         </div>)}
                     </Draggable>
                   ))}
                 {provided.placeholder}
               </div> )}
          </Droppable>))}
      </DragDropContext>
    </div>
  );
}
export default App;
