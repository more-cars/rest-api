import {RaceTrackNode} from "../../../../../src/db/nodes/race-tracks/types/RaceTrackNode"
import {seedRaceTrack} from "./seedRaceTrack"

export async function seedRaceTracks(amount: number) {
    const raceTracks: RaceTrackNode[] = []

    for (let i = 0; i < amount; i++) {
        raceTracks.push(await seedRaceTrack())
    }

    return raceTracks
}
