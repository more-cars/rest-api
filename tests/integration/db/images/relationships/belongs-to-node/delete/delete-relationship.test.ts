import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('Trying to delete a ›belongs-to-session-result‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.IMAGE, NodeTypeEnum.CAR_MODEL, DbRelationship.ImageBelongsToNode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.ImageBelongsToNode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.ImageBelongsToNode,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.ImageBelongsToNode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const lapTime = await seedNode(NodeTypeEnum.IMAGE)
        const sessionResult = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        const relationship = await deleteSpecificRelationship(
            lapTime.id,
            sessionResult.id,
            DbRelationship.ImageBelongsToNode,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            DbRelationship.ImageBelongsToNode,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
