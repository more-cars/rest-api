import {expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {CompanyRelationship} from "../../../../../../../src/models/companies/types/CompanyRelationship"

test('Creating a ›has-brand‹ relationship with valid data', async () => {
    const company = await seedCompany()
    const brand = await seedBrand()

    const createdRelationship = await createRelationship(
        company.id,
        brand.id,
        DbRelationship.CompanyHasBrand,
    )

    expect(createdRelationship)
        .toHaveProperty('start_node_id', company.id)
    expect(createdRelationship)
        .toHaveProperty('end_node_id', brand.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', CompanyRelationship.hasBrand)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})

test('Trying to create a ›has-brand‹ relationship with nodes that do not exist', async () => {
    const company = await seedCompany()

    const createdRelationship = await createRelationship(
        company.id,
        -42,
        DbRelationship.CompanyHasBrand,
    )

    expect(createdRelationship)
        .toEqual(false)
})
