import {describe, expect, test} from 'vitest'
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-main-video‹ relationship', () => {
    test('MOTOR SHOW node does not exist', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)

        await expect(MotorShow.deleteHasMainVideoRelationship(motorShow.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('VIDEO node does not exist', async () => {
        const video = await seedNode(DbNodeType.Video)

        await expect(MotorShow.deleteHasMainVideoRelationship(-42, video.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MOTOR SHOW node and VIDEO node do not exist', async () => {
        await expect(MotorShow.deleteHasMainVideoRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-main-video‹ relationship', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)
        const video = await seedNode(DbNodeType.Video)

        await expect(MotorShow.deleteHasMainVideoRelationship(motorShow.properties.id, video.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-main-video‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.MotorShow, DbNodeType.Video, RelationshipType.MotorShowHasMainVideo)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MotorShowHasMainVideo,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await MotorShow.deleteHasMainVideoRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MotorShowHasMainVideo,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
