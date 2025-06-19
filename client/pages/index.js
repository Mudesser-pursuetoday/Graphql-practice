import { useTodos } from '../context/TodoContext';

export default function Home() {
  const { cachedTodos, loading, error } = useTodos();

  console.log("🖥️ UI Rendering Todos:", cachedTodos);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching todos</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Todos from GraphQL + MongoDB</h1>
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
