import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/racing-games/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {RacingGameSchema} from "../../../../../_toolbox/schemas/db/RacingGameSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a RACING GAME that does not exist should return "false"', async () => {
    const expectedRacingGameNode = false
    const actualRacingGameNode = await getNodeById(-42)

    expect(actualRacingGameNode)
        .toBe(expectedRacingGameNode)
})

test('Querying an existing RACING GAME should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.RacingGame)
    const racingGameNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(racingGameNode, RacingGameSchema))
        .toBeTruthy()
})
