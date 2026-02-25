import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Company} from "../../../../../../../../src/models/node-types/companies/Company"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-brand‹ relationship again', async () => {
    const company = await seedNode(DbNodeType.Company)
    const brand = await seedNode(DbNodeType.Brand)

    await expect(Company.createHasBrandRelationship(company.properties.id, brand.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Company.createHasBrandRelationship(company.properties.id, brand.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
