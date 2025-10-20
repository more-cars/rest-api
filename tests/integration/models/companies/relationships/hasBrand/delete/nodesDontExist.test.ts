import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Company} from "../../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Company does not exist', async () => {
    const company = await seedNode(NodeTypeEnum.COMPANY)

    await expect(Company.deleteHasBrandRelationship(company.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Brand does not exist', async () => {
    const brand = await seedNode(NodeTypeEnum.COMPANY)

    await expect(Company.deleteHasBrandRelationship(-42, brand.id))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Both nodes do not exist', async () => {
    await expect(Company.deleteHasBrandRelationship(-42, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})