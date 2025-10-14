import {expect, test} from 'vitest'
import FakeCompany from "../../../../_toolbox/fixtures/nodes/FakeCompany"
import type {BrandBelongsToCompanyRelationship} from "../../../../../src/models/brands/types/BrandBelongsToCompanyRelationship"
import {marshalRelationship} from "../../../../../src/controllers/relationships/marshalRelationship"
import type {BaseRelationship} from "../../../../../src/controllers/relationships/types/BaseRelationship"

test('marshalled output for ›belongs-to-company‹ relationship when provided with complete and valid input data', async () => {
    const partnerNode = Object.assign({}, FakeCompany, {
        id: 2,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    })

    const relationship: BrandBelongsToCompanyRelationship = {
        brand_id: 1,
        company_id: 2,
        relationship_id: 3,
        relationship_name: "BELONGS_TO_COMPANY",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalRelationship(relationship as BaseRelationship, partnerNode, "company")

    expect(marshalledData)
        .toStrictEqual({
            data: {
                relationship_id: 3,
                relationship_name: "belongs-to-company",
                relationship_partner: {
                    node_type: "company",
                    data: partnerNode,
                },
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        })
})
