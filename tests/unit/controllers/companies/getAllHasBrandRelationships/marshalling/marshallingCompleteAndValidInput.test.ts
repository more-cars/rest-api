import {expect, test} from 'vitest'
import type {
    CompanyHasBrandRelationship
} from "../../../../../../src/models/companies/types/CompanyHasBrandRelationship"
import {
    marshalHasBrandRelationships
} from "../../../../../../src/controllers/companies/marshalling/marshalHasBrandRelationships"

test('marshalling a complete and valid request', async () => {
    const relationships: Array<CompanyHasBrandRelationship> = [
        {
            company_id: 1,
            brand_id: 2,
            relationship_id: 3,
            relationship_name: "HAS_BRAND",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            company_id: 10,
            brand_id: 20,
            relationship_id: 30,
            relationship_name: "HAS_BRAND",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            company_id: 100,
            brand_id: 200,
            relationship_id: 300,
            relationship_name: "HAS_BRAND",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        }
    ]

    const mappedNode = marshalHasBrandRelationships(relationships)

    expect(mappedNode)
        .toStrictEqual([
            {
                company_id: 1,
                brand_id: 2,
                relationship_id: 3,
                relationship_name: "has-brand",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            },
            {
                company_id: 10,
                brand_id: 20,
                relationship_id: 30,
                relationship_name: "has-brand",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            },
            {
                company_id: 100,
                brand_id: 200,
                relationship_id: 300,
                relationship_name: "has-brand",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            }
        ])
})
