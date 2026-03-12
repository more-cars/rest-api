import {describe, expect, test} from 'vitest'
import {Programme} from "../../../../../../../../src/models/node-types/programmes/Programme"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-image‹ relationship', () => {
    test('PROGRAMME node does not exist', async () => {
        const programme = await seedNode(DbNodeType.Programme)

        await expect(Programme.deleteHasImageRelationship(programme.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(DbNodeType.Image)

        await expect(Programme.deleteHasImageRelationship(-42, image.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PROGRAMME node and IMAGE node do not exist', async () => {
        await expect(Programme.deleteHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-image‹ relationship', async () => {
        const programme = await seedNode(DbNodeType.Programme)
        const image = await seedNode(DbNodeType.Image)

        await expect(Programme.deleteHasImageRelationship(programme.properties.id, image.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Programme, DbNodeType.Image, RelationshipType.ProgrammeHasImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeHasImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Programme.deleteHasImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeHasImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
