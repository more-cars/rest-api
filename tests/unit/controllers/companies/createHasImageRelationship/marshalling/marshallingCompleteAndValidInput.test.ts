import {expect, test} from 'vitest'
import {
    marshalHasImageRelationship
} from "../../../../../../src/controllers/companies/marshalling/marshalHasImageRelationship"
import {CompanyHasImageRelationship} from "../../../../../../src/models/companies/types/CompanyHasImageRelationship"

test('marshalled output for ›has-image‹ relationship when provided with complete and valid input data', async () => {
    const relationship: CompanyHasImageRelationship = {
        company_id: 1,
        image_id: 2,
        relationship_id: 3,
        relationship_name: "HAS_IMAGE",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalHasImageRelationship(relationship)

    expect(marshalledData)
        .toStrictEqual({
            company_id: 1,
            image_id: 2,
            relationship_id: 3,
            relationship_name: "has-image",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        })
})
