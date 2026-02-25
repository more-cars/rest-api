import {describe, expect, test} from 'vitest'
import {Image} from "../../../../../../../../src/models/node-types/images/Image"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›is-prime-image-of-node‹ relationship', () => {
    test('IMAGE node does not exist', async () => {
        const image = await seedNode(DbNodeType.Image)

        await expect(Image.deleteIsPrimeImageOfNodeRelationship(image.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('NODE node does not exist', async () => {
        const node = await seedNode(DbNodeType.Company)

        await expect(Image.deleteIsPrimeImageOfNodeRelationship(-42, node.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node and NODE node do not exist', async () => {
        await expect(Image.deleteIsPrimeImageOfNodeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-prime-image-of-node‹ relationship', async () => {
        const image = await seedNode(DbNodeType.Image)
        const node = await seedNode(DbNodeType.Company)

        await expect(Image.deleteIsPrimeImageOfNodeRelationship(image.properties.id, node.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›is-prime-image-of-node‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Image, DbNodeType.Company, RelationshipType.ImageIsPrimeImageOfNode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Image.deleteIsPrimeImageOfNodeRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
