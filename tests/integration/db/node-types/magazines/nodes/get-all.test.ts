import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {MagazineNode} from "../../../../../../src/db/node-types/magazines/types/MagazineNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../../src/db/node-types/magazines/getAllNodesOfType"

test('When there are no MAGAZINES then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Magazine)

    const expectedMagazines: MagazineNode[] = []
    const actualMagazines = await getAllNodesOfType()

    expect(actualMagazines)
        .toEqual(expectedMagazines)
})

test('When MAGAZINES exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Magazine)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.Magazine, amount)

    const actualMagazines = await getAllNodesOfType()

    expect(actualMagazines.length)
        .toEqual(amount)
})
