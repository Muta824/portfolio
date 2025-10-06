import { createContext, useContext } from "react";
import { Todo } from "../types/data";

export const TodosContext = createContext<Todo[]>([]);

export function useTodos() {
    return useContext(TodosContext);
}