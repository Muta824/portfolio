import { useState } from "react";
import { TestSet } from "../../types/data";
import { Card } from "@/components/molecules/Card";
import { Text } from "@/components/atoms/Text";

export function TestSetSelector() {
    const [testSets, setTestSets] = useState<TestSet[]>([]);

    return (
        <div className="grid gap-4">
            {testSets.map((testSet) => (
                <Card key={testSet.id}>
                    <Text variant="h3">{testSet.name}</Text>
                </Card>
            ))}
        </div>
    )
}