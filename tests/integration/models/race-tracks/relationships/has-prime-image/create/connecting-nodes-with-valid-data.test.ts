import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
    const image = await seedNode(ControllerNodeType.IMAGE)

    const createdRelationship = await RaceTrack.createHasPrimeImageRelationship(raceTrack.id, image.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(raceTrack.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RaceTrackHasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
