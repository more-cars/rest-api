import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A RACE TRACK cannot have multiple ›has-prime-image‹ relationships', async () => {
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await RaceTrack.createHasPrimeImageRelationship(raceTrack.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        raceTrack.id,
        RelationshipType.RaceTrackHasPrimeImage,
        NodeTypeLabel.Image,
    )

    expect(relationships.length)
        .toBe(1)
})
