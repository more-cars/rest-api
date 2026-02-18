import {expect, test} from 'vitest'
import {getAllModelRelationshipTypes} from "../../../_toolbox/getAllModelRelationshipTypes"
import {FakeNodeInput} from '../../../_toolbox/fixtures/nodes/FakeNodeInput'
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {BaseNode} from "../../../../src/controllers/nodes/types/BaseNode"
import type {Rel} from "../../../../src/models/relationships/types/Rel"
import {marshalRelation} from "../../../../src/controllers/relations/marshalRelation"
import {mapModelRelationTypeToControllerRelationType} from "../../../../src/controllers/relations/mapModelRelationTypeToControllerRelationType"

test('marshalling a relation', async () => {
    getAllModelRelationshipTypes().forEach((relationshipType) => {
        const origin = FakeNodeInput(NodeTypeEnum.BRAND) as unknown as BaseNode
        const destination = FakeNodeInput(NodeTypeEnum.CAR_MODEL) as unknown as BaseNode
        const relationship: Rel = {
            id: 3,
            type: relationshipType,
            origin,
            destination,
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }

        const marshalledRelation = marshalRelation(relationship, NodeTypeEnum.CAR_MODEL)

        expect(marshalledRelation)
            .toStrictEqual({
                data: {
                    relationship_id: 3,
                    relationship_name: mapModelRelationTypeToControllerRelationType(relationshipType),
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
