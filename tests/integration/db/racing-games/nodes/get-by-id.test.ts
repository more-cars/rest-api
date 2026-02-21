import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/racing-games/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGameSchema} from "../../../../_toolbox/schemas/RacingGameSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a RACING GAME that does not exist should return "false"', async () => {
    const expectedRacingGameNode = false
    const actualRacingGameNode = await getNodeById(-42)

    expect(actualRacingGameNode)
        .toBe(expectedRacingGameNode)
})

test('Querying an existing RACING GAME should return a db node with correct schema', async () => {
    const createdNode = await seedNode(ControllerNodeType.RacingGame)
    const racingGameNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(racingGameNode, RacingGameSchema))
        .toBeTruthy()
})
