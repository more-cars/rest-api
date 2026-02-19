import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Trying to delete a ›is-prime-image-of-node‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.IMAGE, NodeTypeEnum.COMPANY, RelationshipType.ImageIsPrimeImageOfNode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node_id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node_id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node_id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)
        const node = await seedNode(NodeTypeEnum.COMPANY)

        const relationship = await deleteSpecificRelationship(
            image.id,
            node.id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
