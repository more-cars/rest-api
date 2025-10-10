import {expect, test} from 'vitest'
import {CompanyHasBrandRelationship} from "../../../../../../src/models/companies/types/CompanyHasBrandRelationship"
import {marshalRelationships} from "../../../../../../src/controllers/relationships/marshalRelationships"
import type {BaseRelationship} from "../../../../../../src/controllers/relationships/types/BaseRelationship"

test('marshalling a complete and valid request', async () => {
    const relationships: Array<CompanyHasBrandRelationship> = [
        {
            company_id: 1,
            brand_id: 2,
            relationship_id: 3,
            relationship_name: "HAS_BRAND",
            relationship_partner: {
                id: 111,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            company_id: 10,
            brand_id: 20,
            relationship_id: 30,
            relationship_name: "HAS_BRAND",
            relationship_partner: {
                id: 222,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            company_id: 100,
            brand_id: 200,
            relationship_id: 300,
            relationship_name: "HAS_BRAND",
            relationship_partner: {
                id: 333,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        }
    ]

    const mappedNode = marshalRelationships(relationships as BaseRelationship[], 'brand')

    expect(mappedNode)
        .toStrictEqual({
            data: [{
                data: {
                    relationship_id: 3,
                    relationship_name: "has-brand",
                    relationship_partner: {
                        node_type: 'brand',
                        data: {
                            id: 111,
                            created_at: "dummy",
                            updated_at: "dummy",
                        }
                    },
                    created_at: "2023-10-01T00:00:00.001Z",
                    updated_at: "2023-10-01T00:00:00.001Z",
                }
            }, {
                data: {
                    relationship_id: 30,
                    relationship_name: "has-brand",
                    relationship_partner: {
                        node_type: 'brand',
                        data: {
                            id: 222,
                            created_at: "dummy",
                            updated_at: "dummy",
                        }
                    },
                    created_at: "2023-10-01T00:00:00.001Z",
                    updated_at: "2023-10-01T00:00:00.001Z",
                }
            }, {
                data: {
                    relationship_id: 300,
                    relationship_name: "has-brand",
                    relationship_partner: {
                        node_type: 'brand',
                        data: {
                            id: 333,
                            created_at: "dummy",
                            updated_at: "dummy",
                        }
                    },
                    created_at: "2023-10-01T00:00:00.001Z",
                    updated_at: "2023-10-01T00:00:00.001Z",
                }
            }]
        })
})
