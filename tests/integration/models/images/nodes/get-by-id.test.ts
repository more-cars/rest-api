import {expect, test} from 'vitest'
import {Image} from "../../../../../src/models/node-types/images/Image"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Fetching an image that does not exist should return "false"', async () => {
    const expectedNode = false
    const actualNode = await Image.findById(-42)

    expect(actualNode)
        .toEqual(expectedNode)
})

test('When the image exists it should be returned', async () => {
    const expectedNode = await seedNode(NodeTypeEnum.IMAGE)
    const actualNode = await Image.findById(expectedNode.id)

    expect(actualNode)
        .toEqual(expectedNode)
})

