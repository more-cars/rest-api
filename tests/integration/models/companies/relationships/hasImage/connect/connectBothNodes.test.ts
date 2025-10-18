import {expect, test} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {Company} from "../../../../../../../src/models/companies/Company"
import {CompanyRelationship} from "../../../../../../../src/models/companies/types/CompanyRelationship"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const company = await seedCompany()
    const image = await seedImage()

    const createdRelationship = await Company.createHasImageRelationship(company.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(company.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(CompanyRelationship.hasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
