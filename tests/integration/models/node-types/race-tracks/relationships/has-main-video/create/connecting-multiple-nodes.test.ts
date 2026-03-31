import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {RaceTrack} from "../../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RACE TRACK cannot have multiple ›has-main-video‹ relationships', async () => {
    const raceTrack = await seedNode(DbNodeType.RaceTrack)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await RaceTrack.createHasMainVideoRelationship(raceTrack.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(raceTrack.properties.id, RelationshipType.RaceTrackHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
