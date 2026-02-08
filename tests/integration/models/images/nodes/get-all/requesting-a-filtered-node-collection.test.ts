import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {ImageNode} from "../../../../../../src/models/images/types/ImageNode"
import {Image} from "../../../../../../src/models/images/Image"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all IMAGE nodes" request returns only the matching nodes', () => {
    test('when there exist NO image nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.IMAGE)

        const expectedNodes: Array<ImageNode> = []
        const actualNodes = await Image.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist image nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.IMAGE)
        const nodeA = await seedNode(NodeTypeEnum.IMAGE, {name: 'A Node'}) as ImageNode
        await seedNode(NodeTypeEnum.IMAGE, {name: 'B Node'})
        await seedNode(NodeTypeEnum.IMAGE, {name: 'C Node'})

        const filteredNodes = await Image.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
