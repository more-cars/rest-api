import {describe, expect, test} from 'vitest'
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('RACE TRACK node does not exist', async () => {
        const raceTrack = await seedNode(DbNodeType.RaceTrack)

        await expect(RaceTrack.deleteHasPrimeImageRelationship(raceTrack.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(DbNodeType.Image)

        await expect(RaceTrack.deleteHasPrimeImageRelationship(-42, image.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACE TRACK node and IMAGE node do not exist', async () => {
        await expect(RaceTrack.deleteHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
        const raceTrack = await seedNode(DbNodeType.RaceTrack)
        const image = await seedNode(DbNodeType.Image)

        await expect(RaceTrack.deleteHasPrimeImageRelationship(raceTrack.properties.id, image.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-prime-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.RaceTrack, DbNodeType.Image, RelationshipType.RaceTrackHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RaceTrackHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RaceTrack.deleteHasPrimeImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RaceTrackHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
