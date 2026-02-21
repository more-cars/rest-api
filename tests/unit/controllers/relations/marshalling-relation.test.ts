import {expect, test} from 'vitest'
import {getAllModelRelationshipTypes} from "../../../_toolbox/getAllModelRelationshipTypes"
import type {Rel} from "../../../../src/models/relationships/types/Rel"
import {marshalRelation} from "../../../../src/controllers/relations/marshalRelation"
import {mapModelRelationTypeToControllerRelationType} from "../../../../src/controllers/relations/mapModelRelationTypeToControllerRelationType"
import {FakeNodeType} from "../../../_toolbox/fixtures/nodes/FakeNodeType"
import {DbNodeType} from "../../../../src/db/types/DbNodeType"
import {convertModelRelationToControllerRelation} from "../../../../src/controllers/relations/convertModelRelationToControllerRelation"

test('marshalling a relation', async () => {
    getAllModelRelationshipTypes().forEach((relationshipType) => {
        const origin = FakeNodeType(DbNodeType.Brand).modelOutput()
        const destination = FakeNodeType(DbNodeType.CarModel).modelOutput()
        const relationship: Rel = {
            id: 3,
            type: relationshipType,
            origin,
            destination,
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }

        const marshalledRelation = marshalRelation(convertModelRelationToControllerRelation(relationship))

        expect(marshalledRelation)
            .toStrictEqual({
                data: {
                    relationship_id: 3,
                    relationship_name: mapModelRelationTypeToControllerRelationType(relationshipType),
                    relationship_partner: {
                        node_type: "car model",
                        data: destination.attributes,
                    },
                    created_at: "2023-10-01T00:00:00.001Z",
                    updated_at: "2023-10-01T00:00:00.001Z",
                }
            })
    })
})
