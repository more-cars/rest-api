import {RacingEventNode} from "../../../../../src/db/nodes/racing-events/types/RacingEventNode"
import {seedRacingEvent} from "./seedRacingEvent"

export async function seedRacingEvents(amount: number) {
    const racingEvents: RacingEventNode[] = []

    for (let i = 0; i < amount; i++) {
        racingEvents.push(await seedRacingEvent())
    }

    return racingEvents
}
