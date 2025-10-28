import {LapTimeNode} from "../../../../../src/db/nodes/lap-times/types/LapTimeNode"
import {seedLapTime} from "./seedLapTime"

export async function seedLapTimes(amount: number) {
    const lapTimes: LapTimeNode[] = []

    for (let i = 0; i < amount; i++) {
        lapTimes.push(await seedLapTime())
    }

    return lapTimes
}
