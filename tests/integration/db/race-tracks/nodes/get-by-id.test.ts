import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/race-tracks/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {RaceTrackSchema} from "../../../../_toolbox/schemas/RaceTrackSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a RACE TRACK that does not exist should return "false"', async () => {
    const expectedRaceTrackNode = false
    const actualRaceTrackNode = await getNodeById(-42)

    expect(actualRaceTrackNode)
        .toBe(expectedRaceTrackNode)
})

test('Querying an existing RACE TRACK should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.RaceTrack)
    const raceTrackNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(raceTrackNode, RaceTrackSchema))
        .toBeTruthy()
})
