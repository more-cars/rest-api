import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            raceTrack.id,
            image.id,
            RelationshipType.RaceTrackHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', raceTrack.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RelationshipType.RaceTrackHasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

        const createdRelationship = await createRelationship(
            raceTrack.id,
            -42,
            RelationshipType.RaceTrackHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
