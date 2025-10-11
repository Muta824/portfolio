export type Todo = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    type?: string;
    weekStart?: Date | null;
    monthStart?: Date | null;
    yearStart?: Date | null;
}