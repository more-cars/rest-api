import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"
import {Image} from "../../../../../../../src/models/node-types/images/Image"

describe('Deleting a ›belongs-to-node‹ relationship', () => {
    test('IMAGE node does not exist', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(Image.deleteBelongsToNodeRelationship(image.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PARTNER node does not exist', async () => {
        const company = await seedNode(NodeTypeEnum.COMPANY)

        await expect(Image.deleteBelongsToNodeRelationship(-42, company.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('COMPANY node and IMAGE node do not exist', async () => {
        await expect(Image.deleteBelongsToNodeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-node‹ relationship', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)
        const company = await seedNode(NodeTypeEnum.COMPANY)

        await expect(Image.deleteBelongsToNodeRelationship(image.id, company.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-node‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.IMAGE, NodeTypeEnum.COMPANY, RelationshipType.ImageBelongsToNode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.ImageBelongsToNode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Image.deleteBelongsToNodeRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.ImageBelongsToNode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
