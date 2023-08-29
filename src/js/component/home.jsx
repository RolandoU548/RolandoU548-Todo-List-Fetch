import React, { useEffect, useState } from "react";
import "../../styles/home.css";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const url = "https://playground.4geeks.com/apis/fake/todos/user/RolandoU548";
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([
      {
        done: false,
        id: 1,
        label: "rumbear",
      },
      {
        done: false,
        id: 1,
        label: "joder",
      },
      {
        done: false,
        id: 1,
        label: "molestar",
      },
      {
        done: false,
        id: 1,
        label: "flojear",
      },
    ]),
  };

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTodos(todos.concat(data.map((tarea) => tarea.label))))
      .catch((error) => console.error("Error", error));
  }, []);

  return (
    <div className="container col-6">
      <h1>My todos</h1>
      <ul>
        <li>
          <input
            type="text"
            placeholder="What do you need to do?"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) =>
              e.target.value != ""
                ? e.key == "Enter"
                  ? (() => {
                      setTodos(todos.concat(inputValue));
                      fetch(url, options)
                        .then((response) => response.json())
                        .then((data) => console.log(data))
                        .catch((error) => console.error("Error", error));
                    })()
                  : null
                : null
            }
          />
        </li>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <svg
              onClick={() =>
                setTodos(
                  todos.filter((todo, currentIndex) => index != currentIndex)
                )
              }
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
            </svg>
          </li>
        ))}
      </ul>
      <div>
        <small>{todos.length} tasks</small>
      </div>
    </div>
  );
};

export default Home;
