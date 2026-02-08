import {expect, test} from 'vitest'
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getNodeById} from "../../../../../src/db/nodes/images/getNodeById"
import {ImageSchema} from "../../../../_toolbox/schemas/ImageSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying an image that does not exist should return "false"', async () => {
    const expectedNode = false
    const actualNode = await getNodeById(-42)

    expect(actualNode)
        .toBe(expectedNode)
})

test('Querying an existing brand should return a db node with correct schema', async () => {
    const existingNode = await seedNode(NodeTypeEnum.IMAGE)
    const requestedNode = await getNodeById(existingNode.id)

    expect(validateJson(requestedNode, ImageSchema))
        .toBeTruthy()
})
