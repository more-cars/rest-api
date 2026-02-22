import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/racing-sessions/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {RacingSessionSchema} from "../../../../_toolbox/schemas/RacingSessionSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a RACING SESSION that does not exist should return "false"', async () => {
    const expectedRacingSessionNode = false
    const actualRacingSessionNode = await getNodeById(-42)

    expect(actualRacingSessionNode)
        .toBe(expectedRacingSessionNode)
})

test('Querying an existing RACING SESSION should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.RacingSession)
    const racingSessionNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(racingSessionNode, RacingSessionSchema))
        .toBeTruthy()
})
