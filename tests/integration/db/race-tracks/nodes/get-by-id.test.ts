import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/race-tracks/getNodeById"
import {seedRaceTrack} from "../../../../_toolbox/dbSeeding/race-tracks/nodes/seedRaceTrack"
import {RaceTrackNode} from "../../../../../src/db/nodes/race-tracks/types/RaceTrackNode"
import {RaceTrackSchema} from "../../../../_toolbox/schemas/RaceTrackSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a RACE TRACK that does not exist should return "false"', async () => {
    const expectedRaceTrackNode = false
    const actualRaceTrackNode = await getNodeById(-42)

    expect(actualRaceTrackNode)
        .toBe(expectedRaceTrackNode)
})

test('Querying an existing RACE TRACK should return a db node with correct schema', async () => {
    const createdNode: RaceTrackNode = await seedRaceTrack()
    const raceTrackNode = await getNodeById(createdNode.id)

    expect(validateJson(raceTrackNode, RaceTrackSchema))
        .toBeTruthy()
})
