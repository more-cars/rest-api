import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {CompanyNode} from "../../../../../../../src/db/node-types/companies/types/CompanyNode"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {FilterOperator} from "../../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('A filtered "get all COMPANY nodes" request returns only the matching nodes', () => {
    test('when there exist no COMPANY nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Company)

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
        await deleteAllNodesOfType(DbNodeType.Company)
        const nodeA = await seedNode(DbNodeType.Company, {name: 'A Node'}) as CompanyNode
        await seedNode(DbNodeType.Company, {name: 'B Node'})
        await seedNode(DbNodeType.Company, {name: 'C Node'})

        const filteredNodes = await Company.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
