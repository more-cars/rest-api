import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {ImageNode} from "../../../../../../../src/models/node-types/images/types/ImageNode"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('A non-parametrized "get IMAGE COMPANY nodes" request returns the correct number of nodes', () => {
    test('when there exist no IMAGE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Image)

        const expectedNodes: ImageNode[] = []
        const actualNodes = await Image.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist IMAGE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Image)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.Image, amount)

        const actualNodes = await Image.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
