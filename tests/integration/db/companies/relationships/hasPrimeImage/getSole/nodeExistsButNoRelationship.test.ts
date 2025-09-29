import {expect, test} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when the relationship does not exist', async () => {
    const company = await seedCompany()

    const relationships = await getRelationshipsForSpecificNode(
        company.id,
        DbRelationship.CompanyHasPrimeImage,
    )

    expect(relationships.length)
        .toBe(0)
})