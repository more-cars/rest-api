import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getAllNodesOfType} from "../../../../../src/db/nodes/images/getAllNodesOfType"
import {ImageNode} from "../../../../../src/db/nodes/images/types/ImageNode"
import {seedImages} from "../../../../_toolbox/dbSeeding/images/nodes/seedImages"

test('When there are no images then an empty array should be returned', async () => {
    await deleteAllNodesOfType(NodeTypeEnum.IMAGE)

    const expectedNodes: Array<ImageNode> = []
    const actualNodes = await getAllNodesOfType()

    expect(actualNodes)
        .toEqual(expectedNodes)
})

test('When images exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(NodeTypeEnum.IMAGE)
    const amount = Math.ceil(Math.random() * 50)
    await seedImages(amount)

    const nodes = await getAllNodesOfType()

    expect(nodes.length)
        .toEqual(amount)
})
