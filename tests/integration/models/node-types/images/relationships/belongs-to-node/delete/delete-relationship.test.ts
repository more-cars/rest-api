import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"
import {Image} from "../../../../../../../../src/models/node-types/images/Image"

describe('Deleting a ›belongs-to-node‹ relationship', () => {
    test('IMAGE node does not exist', async () => {
        const image = await seedNode(DbNodeType.Image)

        await expect(Image.deleteBelongsToNodeRelationship(image.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PARTNER node does not exist', async () => {
        const company = await seedNode(DbNodeType.Company)

        await expect(Image.deleteBelongsToNodeRelationship(-42, company.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('COMPANY node and IMAGE node do not exist', async () => {
        await expect(Image.deleteBelongsToNodeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-node‹ relationship', async () => {
        const image = await seedNode(DbNodeType.Image)
        const company = await seedNode(DbNodeType.Company)

        await expect(Image.deleteBelongsToNodeRelationship(image.properties.id, company.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-node‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Image, DbNodeType.Company, RelationshipType.ImageBelongsToNode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ImageBelongsToNode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Image.deleteBelongsToNodeRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ImageBelongsToNode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
