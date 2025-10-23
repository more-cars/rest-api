import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/racing-events/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEventNode} from "../../../../../src/db/nodes/racing-events/types/RacingEventNode"
import {RacingEventSchema} from "../../../../_toolbox/schemas/RacingEventSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a RACING EVENT that does not exist should return "false"', async () => {
    const expectedRacingEventNode = false
    const actualRacingEventNode = await getNodeById(-42)

    expect(actualRacingEventNode)
        .toBe(expectedRacingEventNode)
})

test('Querying an existing RACING EVENT should return a db node with correct schema', async () => {
    const createdNode = await seedNode(NodeTypeEnum.RACING_EVENT) as RacingEventNode
    const racingEventNode = await getNodeById(createdNode.id)

    expect(validateJson(racingEventNode, RacingEventSchema))
        .toBeTruthy()
})
