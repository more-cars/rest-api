import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ModelCarBrandNode} from "../../../../../../../src/db/node-types/model-car-brands/types/ModelCarBrandNode"
import {ModelCarBrand} from "../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all MODEL CAR BRAND nodes" request returns the nodes in correct order', () => {
    test('when there exist no MODEL CAR BRAND nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ModelCarBrand)

        const expectedNodes: ModelCarBrandNode[] = []
        const actualNodes = await ModelCarBrand.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MODEL CAR BRAND nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ModelCarBrand)
        const nodeA = await seedNode(DbNodeType.ModelCarBrand, {name: 'A Node'}) as ModelCarBrandNode
        const nodeB = await seedNode(DbNodeType.ModelCarBrand, {name: 'B Node'}) as ModelCarBrandNode
        const nodeC = await seedNode(DbNodeType.ModelCarBrand, {name: 'C Node'}) as ModelCarBrandNode

        const ascNodes = await ModelCarBrand.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await ModelCarBrand.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
