import {useState} from 'react'
import  {useFormik} from "formik";
import * as Yup from 'yup';
import '../App.css';


const TodoList = () => {
    const [todos, setTodos] = useState([]);

    const formik = useFormik({
        initialValues: {
            task: '',
        },
        validationSchema: Yup.object({
            task: Yup.string()
                .trim()
                .required('Task is required')
                .min(3, 'Task must be at least 3 characters'),
        }),
        onSubmit: (values, { resetForm }) => {
            const newTodo = {
                id: Date.now(),
                text: values.task,
            };
            setTodos(prev => [...prev, newTodo]);
            resetForm();
        },
    });

    const handleDelete = (id:any) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const toggleCompleted = (id:any) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        )
    }


    return (
        <div style={{maxWidth: '400px', margin: '0 auto'}}>
            <h2>Todo List</h2>

            <form onSubmit={formik.handleSubmit} className="input-form">
                <div className="input-container">
                    <input
                        className="todo-input"
                        type="text"
                        name="task"
                        value={formik.values.task}
                        onChange={formik.handleChange}
                        placeholder="Enter a task"
                    />
                    <button type="submit">Add</button>
                </div>
                { formik.touched.task && formik.errors.task && (
                    <div style={{color: 'red', marginTop: '5px'}}>{formik.errors.task}</div>
                )}
            </form>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id} style={{ marginTop: '10px' }}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleCompleted(todo.id)}
                        />
                        <span
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                marginLeft: '8px'
                            }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: '10px' }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TodoList


