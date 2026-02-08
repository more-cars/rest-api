import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {CompanyNode} from "../../../../../../src/models/companies/types/CompanyNode"
import {Company} from "../../../../../../src/models/companies/Company"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all COMPANY nodes" request returns the nodes in correct order', () => {
    test('when there exist NO company nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.COMPANY)

        const expectedNodes: Array<CompanyNode> = []
        const actualNodes = await Company.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist company nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.COMPANY)
        const nodeA = await seedNode(NodeTypeEnum.COMPANY, {name: 'A Node'}) as CompanyNode
        const nodeB = await seedNode(NodeTypeEnum.COMPANY, {name: 'B Node'}) as CompanyNode
        const nodeC = await seedNode(NodeTypeEnum.COMPANY, {name: 'C Node'}) as CompanyNode

        const ascNodes = await Company.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await Company.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
