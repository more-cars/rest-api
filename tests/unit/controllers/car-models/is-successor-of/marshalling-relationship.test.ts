import {expect, test} from 'vitest'
import FakeCarModel from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import type {CarModelIsSuccessorOfRelationship} from "../../../../../src/models/car-models/types/CarModelIsSuccessorOfRelationship"
import {marshalRelationship} from "../../../../../src/controllers/relationships/marshalRelationship"
import type {BaseRelationship} from "../../../../../src/controllers/relationships/types/BaseRelationship"

test('marshalled output for ›is-successor-of‹ relationship when provided with complete and valid input data', async () => {
    const partnerNode = Object.assign({}, FakeCarModel, {
        id: 2,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    })

    const relationship: CarModelIsSuccessorOfRelationship = {
        car_model_id: 1,
        partner_id: 2,
        relationship_id: 3,
        relationship_name: "IS_SUCCESSOR_OF",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalRelationship(relationship as BaseRelationship, partnerNode, "car model")

    expect(marshalledData)
        .toStrictEqual({
            data: {
                relationship_id: 3,
                relationship_name: "is-successor-of",
                relationship_partner: {
                    node_type: "car-model",
                    data: partnerNode,
                },
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        })
})
