import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/racing-games/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGameSchema} from "../../../../_toolbox/schemas/RacingGameSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a RACING GAME that does not exist should return "false"', async () => {
    const expectedRacingGameNode = false
    const actualRacingGameNode = await getNodeById(-42)

    expect(actualRacingGameNode)
        .toBe(expectedRacingGameNode)
})

test('Querying an existing RACING GAME should return a db node with correct schema', async () => {
    const createdNode = await seedNode(NodeTypeEnum.RACING_GAME)
    const racingGameNode = await getNodeById(createdNode.id)

    expect(validateJson(racingGameNode, RacingGameSchema))
        .toBeTruthy()
})
