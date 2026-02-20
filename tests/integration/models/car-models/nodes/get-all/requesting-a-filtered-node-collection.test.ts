import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {CarModelNode} from "../../../../../../src/models/node-types/car-models/types/CarModelNode"
import {CarModel} from "../../../../../../src/models/node-types/car-models/CarModel"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all CAR MODEL nodes" request returns only the matching nodes', () => {
    test('when there exist no CAR MODEL nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.CAR_MODEL)

        const expectedNodes: CarModelNode[] = []
        const actualNodes = await CarModel.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist CAR MODEL nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.CAR_MODEL)
        const nodeA = await seedNode(ControllerNodeType.CAR_MODEL, {name: 'A Node'}) as unknown as CarModelNode
        await seedNode(ControllerNodeType.CAR_MODEL, {name: 'B Node'})
        await seedNode(ControllerNodeType.CAR_MODEL, {name: 'C Node'})

        const filteredNodes = await CarModel.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.attributes.name)
    })
})
