import {SessionResultNode} from "../../../../../src/db/nodes/session-results/types/SessionResultNode"
import {seedSessionResult} from "./seedSessionResult"

export async function seedSessionResults(amount: number) {
    const sessionResults: SessionResultNode[] = []

    for (let i = 0; i < amount; i++) {
        sessionResults.push(await seedSessionResult())
    }

    return sessionResults
}
