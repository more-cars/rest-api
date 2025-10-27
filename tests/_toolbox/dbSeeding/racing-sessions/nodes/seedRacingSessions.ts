import {RacingSessionNode} from "../../../../../src/db/nodes/racing-sessions/types/RacingSessionNode"
import {seedRacingSession} from "./seedRacingSession"

export async function seedRacingSessions(amount: number) {
    const racingSessions: RacingSessionNode[] = []

    for (let i = 0; i < amount; i++) {
        racingSessions.push(await seedRacingSession())
    }

    return racingSessions
}
