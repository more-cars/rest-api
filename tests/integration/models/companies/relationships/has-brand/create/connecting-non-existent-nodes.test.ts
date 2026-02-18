import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-brand‹ relationship with nodes that do not exist', async () => {
    const company = await seedNode(NodeTypeEnum.COMPANY)
    const brand = await seedNode(NodeTypeEnum.BRAND)

    await expect(Company.createHasBrandRelationship(-42, brand.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Company.createHasBrandRelationship(company.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Company.createHasBrandRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
