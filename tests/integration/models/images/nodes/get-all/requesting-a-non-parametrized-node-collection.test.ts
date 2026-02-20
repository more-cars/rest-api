import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {ImageNode} from "../../../../../../src/models/node-types/images/types/ImageNode"
import {Image} from "../../../../../../src/models/node-types/images/Image"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get IMAGE COMPANY nodes" request returns the correct number of nodes', () => {
    test('when there exist no IMAGE nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.IMAGE)

        const expectedNodes: ImageNode[] = []
        const actualNodes = await Image.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist IMAGE nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.IMAGE)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(ControllerNodeType.IMAGE, amount)

        const actualNodes = await Image.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
