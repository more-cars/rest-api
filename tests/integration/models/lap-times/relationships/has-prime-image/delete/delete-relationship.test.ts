import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)

        await expect(LapTime.deleteHasPrimeImageRelationship(lapTime.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(DbNodeType.Image)

        await expect(LapTime.deleteHasPrimeImageRelationship(-42, image.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node and IMAGE node do not exist', async () => {
        await expect(LapTime.deleteHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)
        const image = await seedNode(DbNodeType.Image)

        await expect(LapTime.deleteHasPrimeImageRelationship(lapTime.properties.id, image.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-prime-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.LapTime, DbNodeType.Image, RelationshipType.LapTimeHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.LapTimeHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await LapTime.deleteHasPrimeImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.LapTimeHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
