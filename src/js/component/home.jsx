import React, { useEffect, useState } from "react";
import "../../styles/home.css";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [enviarTodos, setEnviarTodos] = useState(0);
  const url = "https://playground.4geeks.com/apis/fake/todos/user/RolandoU548";
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body:
      todos.length > 0
        ? JSON.stringify(
            todos.map((todo, index) => {
              return {
                done: false,
                id: index + 1,
                label: todo,
              };
            })
          )
        : JSON.stringify([
            {
              done: false,
              id: 1,
              label: "example task",
            },
          ]),
  };

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          if (response.status == 404) {
            fetch(
              "https://playground.4geeks.com/apis/fake/todos/user/RolandoU548",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "User-Agent": "Insomnia/2023.5.6",
                },
                body: "[]",
              }
            )
              .then((response) => response.json())
              .then((response) => console.log(response))
              .catch((err) => console.error(err));
          } else {
            throw Error(response.statusText);
          }
        }
        return response.json();
      })
      .then((data) => setTodos(todos.concat(data.map((tarea) => tarea.label))))
      .catch((error) =>
        console.error(
          "Parece que ha habido un problema al recibir las tareas",
          error
        )
      );
  }, []);

  useEffect(() => {
    console.log(todos);
    if (enviarTodos > 0) {
      fetch(url, options)
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          response.json();
        })
        .then((data) => console.log("Tareas enviadas exitosamente:", todos))
        .catch((error) =>
          console.error("Hubo un error al subir las tareas", error)
        );
    }
    setEnviarTodos(enviarTodos + 1);
  }, [todos]);

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
                      e.target.value = "";
                    })()
                  : null
                : null
            }
          />
          <svg
            onClick={() => setTodos([])}
            className="borrar"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
          </svg>
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
