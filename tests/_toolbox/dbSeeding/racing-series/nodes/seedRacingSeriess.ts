import {RacingSeriesNode} from "../../../../../src/db/nodes/racing-series/types/RacingSeriesNode"
import {seedRacingSeries} from "./seedRacingSeries"

export async function seedRacingSeriess(amount: number) {
    const racingSeriess: RacingSeriesNode[] = []

    for (let i = 0; i < amount; i++) {
        racingSeriess.push(await seedRacingSeries())
    }

    return racingSeriess
}
