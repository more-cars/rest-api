import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/race-tracks/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RaceTrackSchema} from "../../../../_toolbox/schemas/RaceTrackSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a RACE TRACK that does not exist should return "false"', async () => {
    const expectedRaceTrackNode = false
    const actualRaceTrackNode = await getNodeById(-42)

    expect(actualRaceTrackNode)
        .toBe(expectedRaceTrackNode)
})

test('Querying an existing RACE TRACK should return a db node with correct schema', async () => {
    const createdNode = await seedNode(ControllerNodeType.RACE_TRACK)
    const raceTrackNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(raceTrackNode, RaceTrackSchema))
        .toBeTruthy()
})
