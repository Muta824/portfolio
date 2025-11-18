import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';

interface AnswerSheetCreateFormProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

export function AnswerSheetCreateForm({ 
    value, 
    onChange, 
    onSubmit, 
    onCancel 
}: AnswerSheetCreateFormProps) {
    return (
        <div className="flex flex-col md:flex-row gap-2">
            <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter the name of the answer sheet (e.g. 1st time, 2nd time)"
                className="flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                autoFocus
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onSubmit();
                    if (e.key === 'Escape') onCancel();
                }}
            />
            <div className="flex justify-around gap-2">
                <Button onClick={onSubmit} variant="primary" className="cursor-pointer">Create</Button>
                <Button onClick={onCancel} variant="secondary" className="cursor-pointer">Cancel</Button>
            </div>
        </div>
    );
}

