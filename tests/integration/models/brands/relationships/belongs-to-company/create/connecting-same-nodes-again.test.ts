import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›belongs-to-company‹ relationship again', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const company = await seedNode(NodeTypeEnum.COMPANY)

    await expect(Brand.createBelongsToCompanyRelationship(brand.id, company.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(Brand.createBelongsToCompanyRelationship(brand.id, company.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
