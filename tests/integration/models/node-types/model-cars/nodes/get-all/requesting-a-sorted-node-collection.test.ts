import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ModelCarNode} from "../../../../../../../src/db/node-types/model-cars/types/ModelCarNode"
import {ModelCar} from "../../../../../../../src/models/node-types/model-cars/ModelCar"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all MODEL CAR nodes" request returns the nodes in correct order', () => {
    test('when there exist no MODEL CAR nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ModelCar)

        const expectedNodes: ModelCarNode[] = []
        const actualNodes = await ModelCar.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MODEL CAR nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ModelCar)
        const nodeA = await seedNode(DbNodeType.ModelCar, {name: 'A Node'}) as ModelCarNode
        const nodeB = await seedNode(DbNodeType.ModelCar, {name: 'B Node'}) as ModelCarNode
        const nodeC = await seedNode(DbNodeType.ModelCar, {name: 'C Node'}) as ModelCarNode

        const ascNodes = await ModelCar.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await ModelCar.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
