import {expect, test} from 'vitest'
import FakeBrand from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {CompanyHasBrandRelationship} from "../../../../../src/models/companies/types/CompanyHasBrandRelationship"
import {marshalRelationship} from "../../../../../src/controllers/relationships/marshalRelationship"
import type {BaseRelationship} from "../../../../../src/controllers/relationships/types/BaseRelationship"

test('marshalled output for ›has-brand‹ relationship when provided with complete and valid input data', async () => {
    const partnerNode = Object.assign({}, FakeBrand, {
        id: 2,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    })

    const relationship: CompanyHasBrandRelationship = {
        company_id: 1,
        brand_id: 2,
        relationship_id: 3,
        relationship_name: "HAS_BRAND",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalRelationship(relationship as BaseRelationship, partnerNode, "brand")

    expect(marshalledData)
        .toStrictEqual({
            data: {
                relationship_id: 3,
                relationship_name: "has-brand",
                relationship_partner: {
                    node_type: "brand",
                    data: partnerNode,
                },
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        })
})
