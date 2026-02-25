import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {CarModelNode} from "../../../../../../../src/db/node-types/car-models/types/CarModelNode"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('A sorted "get all CAR MODEL nodes" request returns the nodes in correct order', () => {
    test('when there exist no CAR MODEL nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.CarModel)

        const expectedNodes: CarModelNode[] = []
        const actualNodes = await CarModel.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist CAR MODEL nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.CarModel)
        const nodeA = await seedNode(DbNodeType.CarModel, {name: 'A Node'}) as CarModelNode
        const nodeB = await seedNode(DbNodeType.CarModel, {name: 'B Node'}) as CarModelNode
        const nodeC = await seedNode(DbNodeType.CarModel, {name: 'C Node'}) as CarModelNode

        const ascNodes = await CarModel.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await CarModel.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
