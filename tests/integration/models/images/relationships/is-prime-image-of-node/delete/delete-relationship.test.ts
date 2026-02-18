import {describe, expect, test} from 'vitest'
import {Image} from "../../../../../../../src/models/images/Image"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›is-prime-image-of-node‹ relationship', () => {
    test('IMAGE node does not exist', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(Image.deleteIsPrimeImageOfNodeRelationship(image.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('NODE node does not exist', async () => {
        const node = await seedNode(NodeTypeEnum.COMPANY)

        await expect(Image.deleteIsPrimeImageOfNodeRelationship(-42, node.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node and NODE node do not exist', async () => {
        await expect(Image.deleteIsPrimeImageOfNodeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-prime-image-of-node‹ relationship', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)
        const node = await seedNode(NodeTypeEnum.COMPANY)

        await expect(Image.deleteIsPrimeImageOfNodeRelationship(image.id, node.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›is-prime-image-of-node‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.IMAGE, NodeTypeEnum.COMPANY, RelationshipType.ImageIsPrimeImageOfNode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Image.deleteIsPrimeImageOfNodeRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
