import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {ImageNode} from "../../../../../../src/models/node-types/images/types/ImageNode"
import {Image} from "../../../../../../src/models/node-types/images/Image"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all IMAGE nodes" request returns only the matching nodes', () => {
    test('when there exist no IMAGE nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.IMAGE)

        const expectedNodes: ImageNode[] = []
        const actualNodes = await Image.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist IMAGE nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.IMAGE)
        const nodeA = await seedNode(ControllerNodeType.IMAGE, {
            name: 'A Node'
        }) as unknown as ImageNode
        await seedNode(ControllerNodeType.IMAGE, {name: 'B Node'})
        await seedNode(ControllerNodeType.IMAGE, {name: 'C Node'})

        const filteredNodes = await Image.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.attributes.name)
    })
})
