import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {CompanyNode} from "../../../../../../src/models/companies/types/CompanyNode"
import {Company} from "../../../../../../src/models/companies/Company"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all IMAGE nodes" request returns the correct number of nodes', () => {
    test('when there exist no IMAGE nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.COMPANY)

        const expectedNodes: CompanyNode[] = []
        const actualNodes = await Company.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist IMAGE nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.COMPANY)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.IMAGE, amount)

        const actualNodes = await Company.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
