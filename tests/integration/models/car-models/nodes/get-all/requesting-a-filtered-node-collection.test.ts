import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {CarModelNode} from "../../../../../../src/models/car-models/types/CarModelNode"
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all CAR MODEL nodes" request returns only the matching nodes', () => {
    test('when there exist NO car model nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL)

        const expectedNodes: Array<CarModelNode> = []
        const actualNodes = await CarModel.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist car model nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL)
        const nodeA = await seedNode(NodeTypeEnum.CAR_MODEL, {name: 'A Node'}) as CarModelNode
        await seedNode(NodeTypeEnum.CAR_MODEL, {name: 'B Node'})
        await seedNode(NodeTypeEnum.CAR_MODEL, {name: 'C Node'})

        const filteredNodes = await CarModel.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
