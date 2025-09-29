import {expect, test} from 'vitest'
import {
    marshalHasPrimeImageRelationship
} from "../../../../../../src/controllers/companies/marshalling/marshalHasPrimeImageRelationship"
import {CompanyHasPrimeImageRelationship} from "../../../../../../src/models/companies/types/CompanyHasPrimeImageRelationship"

test('marshalled output for ›has-prime-image‹ relationship when provided with complete and valid input data', async () => {
    const relationship: CompanyHasPrimeImageRelationship = {
        company_id: 1,
        image_id: 2,
        relationship_id: 3,
        relationship_name: "has-prime-image",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalHasPrimeImageRelationship(relationship)

    expect(marshalledData)
        .toStrictEqual({
            company_id: 1,
            image_id: 2,
            relationship_id: 3,
            relationship_name: "has-prime-image",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        })
})
