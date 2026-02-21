import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A RACE TRACK can have multiple ›has-image‹ relationships', async () => {
    const raceTrack = await seedNode(ControllerNodeType.RaceTrack)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.Image, imagesAmount)

    for (const image of images) {
        await RaceTrack.createHasImageRelationship(raceTrack.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(
        raceTrack.properties.id,
        RelationshipType.RaceTrackHasImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
