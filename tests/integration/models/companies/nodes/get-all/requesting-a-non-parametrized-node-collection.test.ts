import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {CompanyNode} from "../../../../../../src/models/companies/types/CompanyNode"
import {Company} from "../../../../../../src/models/companies/Company"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all COMPANY nodes" request returns the correct number of nodes', () => {
    test('when there exist no COMPANY nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.COMPANY)

        const expectedNodes: CompanyNode[] = []
        const actualNodes = await Company.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist COMPANY nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.COMPANY)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.COMPANY, amount)

        const actualNodes = await Company.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
