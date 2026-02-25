import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Brand} from "../../../../../../../../src/models/node-types/brands/Brand"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-company‹ relationship again', async () => {
    const brand = await seedNode(DbNodeType.Brand)
    const company = await seedNode(DbNodeType.Company)

    await expect(Brand.createBelongsToCompanyRelationship(brand.properties.id, company.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Brand.createBelongsToCompanyRelationship(brand.properties.id, company.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
