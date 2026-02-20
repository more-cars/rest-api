import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {CompanyNode} from "../../../../../../src/models/node-types/companies/types/CompanyNode"
import {Company} from "../../../../../../src/models/node-types/companies/Company"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all COMPANY nodes" request returns the nodes in correct order', () => {
    test('when there exist no COMPANY nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.COMPANY)

        const expectedNodes: CompanyNode[] = []
        const actualNodes = await Company.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist COMPANY nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.COMPANY)
        const nodeA = await seedNode(ControllerNodeType.COMPANY, {name: 'A Node'}) as unknown as CompanyNode
        const nodeB = await seedNode(ControllerNodeType.COMPANY, {name: 'B Node'}) as unknown as CompanyNode
        const nodeC = await seedNode(ControllerNodeType.COMPANY, {name: 'C Node'}) as unknown as CompanyNode

        const ascNodes = await Company.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.attributes.name)
        expect(ascNodes[1].attributes.name === nodeB.attributes.name)
        expect(ascNodes[2].attributes.name === nodeC.attributes.name)

        const descNodes = await Company.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.attributes.name)
        expect(descNodes[1].attributes.name === nodeB.attributes.name)
        expect(descNodes[2].attributes.name === nodeA.attributes.name)
    })
})
