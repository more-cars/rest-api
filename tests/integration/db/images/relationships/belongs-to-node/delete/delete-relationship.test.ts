import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('Trying to delete a ›belongs-to-session-result‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.IMAGE, ControllerNodeType.CAR_MODEL, RelationshipType.ImageBelongsToNode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ImageBelongsToNode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ImageBelongsToNode,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ImageBelongsToNode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const lapTime = await seedNode(ControllerNodeType.IMAGE)
        const sessionResult = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

        const relationship = await deleteSpecificRelationship(
            lapTime.id,
            sessionResult.id,
            RelationshipType.ImageBelongsToNode,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.ImageBelongsToNode,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
