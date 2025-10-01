import {expect, test} from 'vitest'
import type {
    CompanyHasImageRelationship
} from "../../../../../../src/models/companies/types/CompanyHasImageRelationship"
import {
    marshalHasImageRelationships
} from "../../../../../../src/controllers/companies/marshalling/marshalHasImageRelationships"

test('marshalling a complete and valid request', async () => {
    const relationships: Array<CompanyHasImageRelationship> = [
        {
            company_id: 1,
            image_id: 2,
            relationship_id: 3,
            relationship_name: "HAS_IMAGE",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            company_id: 10,
            image_id: 20,
            relationship_id: 30,
            relationship_name: "HAS_IMAGE",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            company_id: 100,
            image_id: 200,
            relationship_id: 300,
            relationship_name: "HAS_IMAGE",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        }
    ]

    const mappedNode = marshalHasImageRelationships(relationships)

    expect(mappedNode)
        .toStrictEqual([
            {
                company_id: 1,
                image_id: 2,
                relationship_id: 3,
                relationship_name: "has-image",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            },
            {
                company_id: 10,
                image_id: 20,
                relationship_id: 30,
                relationship_name: "has-image",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            },
            {
                company_id: 100,
                image_id: 200,
                relationship_id: 300,
                relationship_name: "has-image",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            }
        ])
})
