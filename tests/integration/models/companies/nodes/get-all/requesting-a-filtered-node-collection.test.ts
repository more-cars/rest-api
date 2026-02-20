import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {CompanyNode} from "../../../../../../src/models/node-types/companies/types/CompanyNode"
import {Company} from "../../../../../../src/models/node-types/companies/Company"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all COMPANY nodes" request returns only the matching nodes', () => {
    test('when there exist no COMPANY nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.COMPANY)

        const expectedNodes: CompanyNode[] = []
        const actualNodes = await Company.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist COMPANY nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.COMPANY)
        const nodeA = await seedNode(ControllerNodeType.COMPANY, {name: 'A Node'}) as CompanyNode
        await seedNode(ControllerNodeType.COMPANY, {name: 'B Node'})
        await seedNode(ControllerNodeType.COMPANY, {name: 'C Node'})

        const filteredNodes = await Company.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
