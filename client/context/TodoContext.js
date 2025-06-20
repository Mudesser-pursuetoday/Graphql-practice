import { createContext, useContext, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';


const TodoContext = createContext();

const GET_TODOS = gql`
  query {
    getTodos {
      id
      title
      completed
    }
  }
`;

export const TodoProvider = ({ children }) => {
  const { data, loading, error } = useQuery(GET_TODOS);
  const [cachedTodos, setCachedTodos] = useState([]);

  useEffect(() => {
    if (data?.getTodos) {
      console.log("📦 Received todos in context:", data.getTodos);
      setCachedTodos(data.getTodos);
    }
  }, [data]);

  console.log("🧠 Context State:", { loading, error, cachedTodos });

  return (
    <TodoContext.Provider value={{ cachedTodos, loading, error }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
