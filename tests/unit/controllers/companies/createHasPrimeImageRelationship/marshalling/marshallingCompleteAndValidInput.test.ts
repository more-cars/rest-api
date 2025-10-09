import {expect, test} from 'vitest'
import FakeImageFull from "../../../../../_toolbox/fixtures/nodes/FakeImageFull"
import type {
    CompanyHasPrimeImageRelationship
} from "../../../../../../src/models/companies/types/CompanyHasPrimeImageRelationship"
import {marshalRelationship} from "../../../../../../src/controllers/relationships/marshalRelationship"

test('marshalled output for ›has-prime-image‹ relationship when provided with complete and valid input data', async () => {
    const partnerNode = Object.assign({}, FakeImageFull, {
        id: 2,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    })

    const relationship: CompanyHasPrimeImageRelationship = {
        company_id: 1,
        image_id: 2,
        relationship_id: 3,
        relationship_name: "HAS_PRIME_IMAGE",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalRelationship(relationship, partnerNode, 'image')

    expect(marshalledData)
        .toStrictEqual({
            data: {
                relationship_id: 3,
                relationship_name: "has-prime-image",
                relationship_partner: {
                    node_type: 'image',
                    data: partnerNode,
                },
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        })
})
