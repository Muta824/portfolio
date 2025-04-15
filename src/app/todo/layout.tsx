import './styles/todo.css';

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="todo-container">
      {children}
    </div>
  );
} 
