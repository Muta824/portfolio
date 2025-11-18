import { Card } from "@/components/molecules/Card";
import { Text } from "@/components/atoms/Text";
import Link from "next/link";
import { getTestSets } from "../../actions/testSet";

export async function TestSetSelection() {
    const testSets = await getTestSets();

    return (
        <div>
            <Text variant="h2" className="mb-6">Test Sets</Text>
            {testSets.length === 0 ? (
                <Text variant="h3">There are no test sets yet.</Text>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {testSets.map((testSet) => (
                        <Link href={`/toeic_scoring_app/${testSet.id}`} key={testSet.id}>
                            <Card className="cursor-pointer hover:scale-103 transition-all duration-200">
                                <Text variant="h3">{testSet.name}</Text>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}