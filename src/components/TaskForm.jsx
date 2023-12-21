import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  //funcion que permite disparar eventos desde
  const dispatch = useDispatch();
  //hook navigate para poder redireccionar a otras paginas
  const navigate = useNavigate();
  //obtenemos id por la url
  const params = useParams();

  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    //buscamos la tarea por el id que recibimos por la url
    if (params.id) {
      const foundedTask = tasks.find((task) => task.id === params.id);
      //seteamos la tarea que encontramos en el estado
      setTask(foundedTask);
    }
  }, [params.id, tasks]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //si hay un id en la url, editamos la tarea, sino la añadimos
    if (params.id) {
      dispatch(
        //editamos una tarea, copiando el estado actual y añadiendo un id
        updateTask({
          ...task,
        })
      );
    } else {
      dispatch(
        //añadimos una tarea, copiando el estado actual y añadiendo un id
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    setTask({
      title: "",
      description: "",
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label className="block text-sm font-bold mb-2" htmlFor="tittle">
        Tarea
      </label>
      <input
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        type="text"
        name="title"
        onChange={handleChange}
        placeholder="name"
        value={task.title}
      />
      <label className="block text-sm font-bold mb-2" htmlFor="description">
        description
      </label>

      <textarea
        className="w-full p-2 rounded-md bg-zinc-600 mb-2 resize-none"
        name="description"
        onChange={handleChange}
        placeholder="description"
        value={task.description}
      ></textarea>

      <button
        type="submit"
        className="w-full bg-green-500 rounded-md py-3 text-lg"
      >
        guardar
      </button>
    </form>
  );
}
