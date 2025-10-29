import {expect, test} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when the relationships do not exist', async () => {
    const company = await seedCompany()

    const relationships = await getRelationshipCollection(
        company.id,
        DbRelationship.CompanyHasImage,
    )

    expect(relationships.length)
        .toBe(0)
})