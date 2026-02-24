import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {CompanyNode} from "../../../../../../src/db/node-types/companies/types/CompanyNode"
import {Company} from "../../../../../../src/models/node-types/companies/Company"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A sorted "get all COMPANY nodes" request returns the nodes in correct order', () => {
    test('when there exist no COMPANY nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Company)

        const expectedNodes: CompanyNode[] = []
        const actualNodes = await Company.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist COMPANY nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Company)
        const nodeA = await seedNode(DbNodeType.Company, {name: 'A Node'}) as CompanyNode
        const nodeB = await seedNode(DbNodeType.Company, {name: 'B Node'}) as CompanyNode
        const nodeC = await seedNode(DbNodeType.Company, {name: 'C Node'}) as CompanyNode

        const ascNodes = await Company.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await Company.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
