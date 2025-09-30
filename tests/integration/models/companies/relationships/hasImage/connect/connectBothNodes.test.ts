import {expect, test} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {Company} from "../../../../../../../src/models/companies/Company"
import {CompanyRelationship} from "../../../../../../../src/models/companies/types/CompanyRelationship"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const company = await seedCompany()
    const image = await seedImage()

    const createdRelationship = await Company.createHasImageRelationship(company.id, image.id)

    expect(createdRelationship)
        .toHaveProperty('company_id', company.id)
    expect(createdRelationship)
        .toHaveProperty('image_id', image.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', CompanyRelationship.hasImage)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})
