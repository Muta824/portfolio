import { Card } from "@/components/molecules/Card";
import { Text } from "@/components/atoms/Text";
import Link from "next/link";

export function TestSetSelector() {
    // TODO: get test sets's id and name from database
    const testSets = [
        {
            id: "1",
            name: "Test Set 1",
        },
        {
            id: "2",
            name: "Test Set 2",
        },
        {
            id: "3",
            name: "Test Set 3",
        },
        {
            id: "4",
            name: "Test Set 4",
        },
        {
            id: "5",
            name: "Test Set 5",
        },
        {
            id: "6",
            name: "Test Set 6",
        },
    ];
    return (
        <div className="">
            {/* this is temporary title */}
            <Text variant="h2">Test Set Selector</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testSets.map((testSet) => (
                    <Link href={`/toeic_scoring_app/${testSet.id}`} key={testSet.id}>
                        <Card className="cursor-pointer hover:scale-103 transition-all duration-200">
                            <Text variant="h3">{testSet.name}</Text>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}