import {describe, expect, test} from 'vitest'
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('MOTOR SHOW node does not exist', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)

        await expect(MotorShow.deleteHasPrimeImageRelationship(motorShow.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(DbNodeType.Image)

        await expect(MotorShow.deleteHasPrimeImageRelationship(-42, image.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MOTOR SHOW node and IMAGE node do not exist', async () => {
        await expect(MotorShow.deleteHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)
        const image = await seedNode(DbNodeType.Image)

        await expect(MotorShow.deleteHasPrimeImageRelationship(motorShow.properties.id, image.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-prime-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.MotorShow, DbNodeType.Image, RelationshipType.MotorShowHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MotorShowHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await MotorShow.deleteHasPrimeImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MotorShowHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
