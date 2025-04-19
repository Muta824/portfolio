import './styles/todo.css';

export const metadata = {
  title: "Todo List",
  description: "Todo List",
}

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
