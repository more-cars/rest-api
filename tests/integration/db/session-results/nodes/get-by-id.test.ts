import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/session-results/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResultNode} from "../../../../../src/db/nodes/session-results/types/SessionResultNode"
import {SessionResultSchema} from "../../../../_toolbox/schemas/SessionResultSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a SESSION RESULT that does not exist should return "false"', async () => {
    const expectedSessionResultNode = false
    const actualSessionResultNode = await getNodeById(-42)

    expect(actualSessionResultNode)
        .toBe(expectedSessionResultNode)
})

test('Querying an existing SESSION RESULT should return a db node with correct schema', async () => {
    const createdNode = await seedNode(NodeTypeEnum.SESSION_RESULT) as SessionResultNode
    const sessionResultNode = await getNodeById(createdNode.id)

    expect(validateJson(sessionResultNode, SessionResultSchema))
        .toBeTruthy()
})
