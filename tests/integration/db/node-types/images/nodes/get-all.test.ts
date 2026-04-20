import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {ImageNode} from "../../../../../../src/db/node-types/images/types/ImageNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {fetchNodesFromDb} from "../../../../../../src/db/nodes/fetchNodesFromDb"

test('When there are no IMAGES then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Image)

    const expectedNodes: ImageNode[] = []
    const actualNodes = await fetchNodesFromDb(DbNodeType.Image)

    expect(actualNodes)
        .toEqual(expectedNodes)
})

test('When IMAGES exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Image)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.Image, amount)

    const actualImages = await fetchNodesFromDb(DbNodeType.Image)

    expect(actualImages.length)
        .toEqual(amount)
})
