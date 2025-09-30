import {expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {CompanyRelationship} from "../../../../../../../src/models/companies/types/CompanyRelationship"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const company = await seedCompany()
    const image = await seedImage()

    const createdRelationship = await createRelationship(
        company.id,
        image.id,
        DbRelationship.CompanyHasImage,
    )

    expect(createdRelationship)
        .toHaveProperty('start_node_id', company.id)
    expect(createdRelationship)
        .toHaveProperty('end_node_id', image.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', CompanyRelationship.hasImage)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const company = await seedCompany()

    const createdRelationship = await createRelationship(
        company.id,
        -42,
        DbRelationship.CompanyHasImage,
    )

    expect(createdRelationship)
        .toEqual(false)
})
