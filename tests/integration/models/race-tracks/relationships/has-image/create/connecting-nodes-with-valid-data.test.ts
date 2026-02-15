import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RaceTrack} from "../../../../../../../src/models/race-tracks/RaceTrack"
import {RelationshipType} from "../../../../../../../src/models/relationships/types/RelationshipType"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await RaceTrack.createHasImageRelationship(raceTrack.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(raceTrack.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelationshipType.RaceTrackHasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
