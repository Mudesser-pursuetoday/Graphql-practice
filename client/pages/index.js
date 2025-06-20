import { useTodos } from '../context/TodoContext';
import Papa from 'papaparse';

export default function Home() {
  const { cachedTodos, loading, error } = useTodos();

  console.log("🖥️ UI Rendering Todos:", cachedTodos);

  
  const downloadCSV = () => {
    if (!cachedTodos || cachedTodos.length === 0) return;

    
    const formattedTodos = cachedTodos.map(({ id, title, completed }) => ({
      ID: id,
      Title: title,
      Completed: completed ? 'Yes' : 'No'
    }));

    const csv = Papa.unparse(formattedTodos);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'todos.csv';
    link.click();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching todos</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Todos from GraphQL + MongoDB</h1>
      
      <button onClick={downloadCSV} style={{ marginBottom: '1rem' }}>
        ⬇️ Download CSV
      </button>

      <ul>
        {cachedTodos.map(todo => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
}
