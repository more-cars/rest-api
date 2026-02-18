import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-brand‹ relationship again', async () => {
    const company = await seedNode(NodeTypeEnum.COMPANY)
    const brand = await seedNode(NodeTypeEnum.BRAND)

    await expect(Company.createHasBrandRelationship(company.id, brand.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(Company.createHasBrandRelationship(company.id, brand.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
