import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Company} from "../../../../../../../../src/models/node-types/companies/Company"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const company = await seedNode(DbNodeType.Company)
    const image = await seedNode(DbNodeType.Image)

    const createdRelationship = await Company.createHasImageRelationship(company.properties.id, image.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(company.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(image.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CompanyHasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
