import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/lap-times/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTimeNode} from "../../../../../src/db/nodes/lap-times/types/LapTimeNode"
import {LapTimeSchema} from "../../../../_toolbox/schemas/LapTimeSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a LAP TIME that does not exist should return "false"', async () => {
    const expectedLapTimeNode = false
    const actualLapTimeNode = await getNodeById(-42)

    expect(actualLapTimeNode)
        .toBe(expectedLapTimeNode)
})

test('Querying an existing LAP TIME should return a db node with correct schema', async () => {
    const createdNode = await seedNode(NodeTypeEnum.LAP_TIME) as LapTimeNode
    const lapTimeNode = await getNodeById(createdNode.id)

    expect(validateJson(lapTimeNode, LapTimeSchema))
        .toBeTruthy()
})
