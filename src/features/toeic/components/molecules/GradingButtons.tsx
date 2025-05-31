import { CorrectButton } from "../atoms/CorrectButton";
import { WrongButton } from "../atoms/WrongButton";
import type { Question } from "../../types/data";
import { memo } from "react";

type GradingButtonsProps = {
    q: Question;
}

export const GradingButtons = memo(function GradingButtons(props: GradingButtonsProps) {
    const { q } = props;
    return (
        <div className="flex space-x-2 mt-2 justify-evenly">
            <CorrectButton q={q}/>
            <WrongButton q={q}/>
        </div>
    )
});
