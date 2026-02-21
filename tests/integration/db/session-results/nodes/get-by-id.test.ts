import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/session-results/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResultSchema} from "../../../../_toolbox/schemas/SessionResultSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a SESSION RESULT that does not exist should return "false"', async () => {
    const expectedSessionResultNode = false
    const actualSessionResultNode = await getNodeById(-42)

    expect(actualSessionResultNode)
        .toBe(expectedSessionResultNode)
})

test('Querying an existing SESSION RESULT should return a db node with correct schema', async () => {
    const createdNode = await seedNode(ControllerNodeType.SessionResult)
    const sessionResultNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(sessionResultNode, SessionResultSchema))
        .toBeTruthy()
})
