import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {ImageNode} from "../../../../../src/db/nodes/images/types/ImageNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/images/getAllNodesOfType"

test('When there are no IMAGES then an empty array should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.IMAGE)

    const expectedNodes: ImageNode[] = []
    const actualNodes = await getAllNodesOfType()

    expect(actualNodes)
        .toEqual(expectedNodes)
})

test('When IMAGES exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.IMAGE)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(ControllerNodeType.IMAGE, amount)

    const actualImages = await getAllNodesOfType()

    expect(actualImages.length)
        .toEqual(amount)
})
