import {expect, test} from 'vitest'
import {
    marshalHasBrandRelationship
} from "../../../../../../src/controllers/companies/marshalling/marshalHasBrandRelationship"
import {CompanyHasBrandRelationship} from "../../../../../../src/models/companies/types/CompanyHasBrandRelationship"

test('marshalled output for ›has-brand‹ relationship when provided with complete and valid input data', async () => {
    const relationship: CompanyHasBrandRelationship = {
        company_id: 1,
        brand_id: 2,
        relationship_id: 3,
        relationship_name: "HAS_BRAND",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalHasBrandRelationship(relationship)

    expect(marshalledData)
        .toStrictEqual({
            company_id: 1,
            brand_id: 2,
            relationship_id: 3,
            relationship_name: "has-brand",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        })
})
