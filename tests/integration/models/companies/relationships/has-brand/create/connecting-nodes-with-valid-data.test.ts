import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-brand‹ relationship with valid data', async () => {
    const company = await seedNode(DbNodeType.Company)
    const brand = await seedNode(DbNodeType.Brand)

    const createdRelationship = await Company.createHasBrandRelationship(company.properties.id, brand.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(company.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(brand.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CompanyHasBrand)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
