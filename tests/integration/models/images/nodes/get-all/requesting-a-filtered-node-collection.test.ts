import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {ImageNode} from "../../../../../../src/db/nodes/images/types/ImageNode"
import {Image} from "../../../../../../src/models/node-types/images/Image"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A filtered "get all IMAGE nodes" request returns only the matching nodes', () => {
    test('when there exist no IMAGE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Image)

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
        await deleteAllNodesOfType(DbNodeType.Image)
        const nodeA = await seedNode(DbNodeType.Image, {
            name: 'A Node'
        }) as unknown as ImageNode
        await seedNode(DbNodeType.Image, {name: 'B Node'})
        await seedNode(DbNodeType.Image, {name: 'C Node'})

        const filteredNodes = await Image.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
