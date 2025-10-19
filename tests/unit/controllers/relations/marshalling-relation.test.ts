import {expect, test} from 'vitest'
import {getAllModelRelationshipTypes} from "../../../_toolbox/getAllModelRelationshipTypes"
import {FakeNodeResponse} from "../../../_toolbox/fixtures/nodes/FakeNodeResponse"
import type {BaseNode} from "../../../../src/controllers/nodes/types/BaseNode"
import type {GenericRelation} from "../../../../src/models/relationships/types/GenericRelation"
import {marshalRelation} from "../../../../src/controllers/relationships/marshalRelation"
import {dasherize} from "inflection"

test('marshalling a relation', async () => {
    getAllModelRelationshipTypes().forEach((modelRelationshipType) => {
        const origin = FakeNodeResponse('brand') as unknown as BaseNode
        const destination = FakeNodeResponse('car model') as unknown as BaseNode
        const relation: GenericRelation = {
            id: 3,
            type: modelRelationshipType,
            origin,
            destination,
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }

        const marshalledData = marshalRelation(relation, "car model")

        expect(marshalledData)
            .toStrictEqual({
                data: {
                    relationship_id: 3,
                    relationship_name: dasherize(modelRelationshipType.toLowerCase()),
                    relationship_partner: {
                        node_type: "car-model",
                        data: destination,
                    },
                    created_at: "2023-10-01T00:00:00.001Z",
                    updated_at: "2023-10-01T00:00:00.001Z",
                }
            })
    })
})
