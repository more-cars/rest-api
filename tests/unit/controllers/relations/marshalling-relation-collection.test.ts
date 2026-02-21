import {expect, test} from 'vitest'
import {getAllModelRelationshipTypes} from "../../../_toolbox/getAllModelRelationshipTypes"
import {FakeNodeInput} from "../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import type {ControllerNode} from "../../../../src/controllers/nodes/types/ControllerNode"
import type {Rel} from "../../../../src/models/relationships/types/Rel"
import {marshalRelations} from "../../../../src/controllers/relations/marshalRelations"
import {mapModelRelationTypeToControllerRelationType} from "../../../../src/controllers/relations/mapModelRelationTypeToControllerRelationType"

test('marshalling a relation collection', async () => {
    getAllModelRelationshipTypes().forEach((relationshipType) => {
        const origin = FakeNodeInput(ControllerNodeType.Brand) as unknown as ControllerNode
        const destination = FakeNodeInput(ControllerNodeType.CarModel) as unknown as ControllerNode
        const relationship: Rel = {
            id: 3,
            type: relationshipType,
            origin,
            destination,
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }
        const relationships = [relationship, relationship, relationship]

        const marshalledRelations = marshalRelations(relationships, ControllerNodeType.CarModel)

        expect(marshalledRelations.data.length)
            .toEqual(3)

        const expectedRelation = {
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
        }

        expect(marshalledRelations.data[0])
            .toStrictEqual(expectedRelation)

        expect(marshalledRelations.data[1])
            .toStrictEqual(expectedRelation)

        expect(marshalledRelations.data[2])
            .toStrictEqual(expectedRelation)
    })
})
