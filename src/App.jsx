import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [show, setShow] = useState([]);
  const [invalid, setInvalid] = useState("");
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  function showTask(e) {
    e.preventDefault();

    if (task === "") {
      setInvalid("Please enter a task");
      setTask("");
    } else {
      setShow([...show, task]);
      setProgress(progress + 1);
      setTask("");
    }
  }

  function count(index) {
    setProgress(progress - 1);
    setDone(done + 1);
    const newCompletedTasks = [...completedTasks, index];
    setCompletedTasks(newCompletedTasks);
  }

  function handleEdit(index) {
    setEditingIndex(index);
    setEditTask(show[index]);
  }

  function handleSaveEdit(index) {
    const updatedShow = show.map((item, i) => (i === index ? editTask : item));
    setShow(updatedShow);
    setEditingIndex(null);
    setEditTask("");
  }

  function handleRemove(index) {
    const removed = show.filter((_, i) => i !== index);
    setShow(removed);
    if (completedTasks.includes(index)) {
      setDone(done - 1);
      setCompletedTasks(completedTasks.filter((i) => i !== index));
    } else {
      setProgress(progress - 1);
    }
  }

  return (
    <>
      <div className="w-full h-full">
        <div className="w-[70%] mx-auto relative top-[75px]  sm:w-[90%] ">
          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-[#78288c] via-[#6f6ffb] to-[#07FDFD] bg-clip-text text-transparent">
            TO DO LIST
          </h1>

          <div className="drop-shadow-xl w-full flex mt-[4vh] sm:px-[4vh]">
            <input
              type="text"
              id=""
              placeholder="Enter tasks"
              className="w-full py-[16px] pl-[20px] rounded-s-2xl text-2xl outline-none sm:text-lg"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
                if (e.target.value !== "") {
                  setInvalid("");
                }
              }}
            />
            <button
              className="bg-slate-300 py-[16px] px-[25px] rounded-e-2xl text-xl bg-gradient-to-r from-[#07FDFD] via-[#4D69FE] to-[#CC00FF] text-white"
              onClick={showTask}
            >
              Save
            </button>
          </div>

          {invalid && <p className="text-red-500">{invalid}</p>}

          <div className="w-full">
            <div className="flex justify-between gap-[20px] mt-[4vh] sm:px-[4vh]">
              <p className="w-full border-2 border-grey-500 py-[10px] pl-[16px] text-lg bg-gradient-to-r from-[#CC00FF] via-[#5756FF] to-[#07FDFD] bg-clip-text text-transparent font-medium">
                Total Done: {done}
              </p>
              <p className="w-full border-2 border-grey-500 py-[10px] pl-[16px] text-lg bg-gradient-to-r from-[#CC00FF] via-[#5756FF] to-[#07FDFD] bg-clip-text text-transparent font-medium">
                Total In Progress: {progress}
              </p>
            </div>

            {show.map((item, index) => (
              <div
                className={`flex justify-between items-center border-2 border-grey-500 mt-[4vh] gap-12 ${completedTasks.includes(index) ? 'bg-green-200' : ''}`}
                key={index}
              >
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                    className="py-[16px] pl-[20px] text-2xl"
                  />
                ) : (
                  <p className="py-[16px] pl-[20px] text-2xl">{item}</p>
                )}

                <div className="flex pr-2">
                  <button
                    className="bg-[#FF6262] p-1.5 bg-clip-text text-transparent"
                    onClick={() => handleRemove(index)}
                  >
                    <i className="fa-solid fa-trash fa-2xl"></i>
                  </button>
                  {editingIndex === index ? (
                    <button
                      className="bg-[#FFB800] p-1 bg-clip-text text-transparent"
                      onClick={() => handleSaveEdit(index)}
                    >
                      <i className="fa-solid fa-save fa-2xl"></i>
                    </button>
                  ) : (
                    <button
                      className="bg-[#FFB800] p-1 bg-clip-text text-transparent"
                      onClick={() => handleEdit(index)}
                    >
                      <i className="fa-solid fa-pen-to-square fa-2xl"></i>
                    </button>
                  )}
                  <button
                    className="bg-[#05FF00] p-1 bg-clip-text text-transparent"
                    onClick={() => count(index)}
                  >
                    <i className="fa-solid fa-circle-check fa-2xl"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
