import {describe, expect, test} from 'vitest'
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-image‹ relationship', () => {
    test('MOTOR SHOW node does not exist', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)

        await expect(MotorShow.deleteHasImageRelationship(motorShow.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(DbNodeType.Image)

        await expect(MotorShow.deleteHasImageRelationship(-42, image.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MOTOR SHOW node and IMAGE node do not exist', async () => {
        await expect(MotorShow.deleteHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-image‹ relationship', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)
        const image = await seedNode(DbNodeType.Image)

        await expect(MotorShow.deleteHasImageRelationship(motorShow.properties.id, image.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.MotorShow, DbNodeType.Image, RelationshipType.MotorShowHasImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MotorShowHasImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await MotorShow.deleteHasImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MotorShowHasImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
