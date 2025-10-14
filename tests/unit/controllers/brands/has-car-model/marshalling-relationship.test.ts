import {expect, test} from 'vitest'
import FakeCarModel from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {BrandHasCarModelRelationship} from "../../../../../src/models/brands/types/BrandHasCarModelRelationship"
import {marshalRelationship} from "../../../../../src/controllers/relationships/marshalRelationship"
import type {BaseRelationship} from "../../../../../src/controllers/relationships/types/BaseRelationship"

test('marshalled output for ›has-car-model‹ relationship when provided with complete and valid input data', async () => {
    const partnerNode = Object.assign({}, FakeCarModel, {
        id: 2,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    })

    const relationship: BrandHasCarModelRelationship = {
        brand_id: 1,
        car_model_id: 2,
        relationship_id: 3,
        relationship_name: "HAS_CAR_MODEL",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalRelationship(relationship as BaseRelationship, partnerNode, "car model")

    expect(marshalledData)
        .toStrictEqual({
            data: {
                relationship_id: 3,
                relationship_name: "has-car-model",
                relationship_partner: {
                    node_type: "car-model",
                    data: partnerNode,
                },
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        })
})
