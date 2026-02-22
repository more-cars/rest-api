import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-company‹ relationship with valid data', async () => {
    const brand = await seedNode(DbNodeType.Brand)
    const company = await seedNode(DbNodeType.Company)

    const createdRelationship = await Brand.createBelongsToCompanyRelationship(brand.properties.id, company.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(brand.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(company.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.BrandBelongsToCompany)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
