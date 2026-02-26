import {describe, expect, test} from 'vitest'
import {Magazine} from "../../../../../../../../src/models/node-types/magazines/Magazine"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-image‹ relationship', () => {
    test('MAGAZINE node does not exist', async () => {
        const magazine = await seedNode(DbNodeType.Magazine)

        await expect(Magazine.deleteHasImageRelationship(magazine.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(DbNodeType.Image)

        await expect(Magazine.deleteHasImageRelationship(-42, image.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MAGAZINE node and IMAGE node do not exist', async () => {
        await expect(Magazine.deleteHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-image‹ relationship', async () => {
        const magazine = await seedNode(DbNodeType.Magazine)
        const image = await seedNode(DbNodeType.Image)

        await expect(Magazine.deleteHasImageRelationship(magazine.properties.id, image.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Magazine, DbNodeType.Image, RelationshipType.MagazineHasImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineHasImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Magazine.deleteHasImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineHasImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
