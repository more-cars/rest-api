import {expect, test} from 'vitest'
import {getAllModelRelationshipTypes} from "../../../_toolbox/getAllModelRelationshipTypes"
import {FakeNode} from '../../../_toolbox/fixtures/nodes/FakeNode'
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {BaseNode} from "../../../../src/controllers/nodes/types/BaseNode"
import type {GenericRelation} from "../../../../src/models/relationships/types/GenericRelation"
import {marshalRelation} from "../../../../src/controllers/relationships/marshalRelation"
import {dasherize} from "inflection"

test('marshalling a relation', async () => {
    getAllModelRelationshipTypes().forEach((modelRelationshipType) => {
        const origin = FakeNode(NodeTypeEnum.BRAND) as unknown as BaseNode
        const destination = FakeNode(NodeTypeEnum.CAR_MODEL) as unknown as BaseNode
        const relation: GenericRelation = {
            id: 3,
            type: modelRelationshipType,
            origin,
            destination,
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }

        const marshalledData = marshalRelation(relation, NodeTypeEnum.CAR_MODEL)

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
