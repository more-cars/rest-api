import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A LAP TIME cannot have multiple ›achieved-on-track-layout‹ relationships', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(DbNodeType.TrackLayout, trackLayoutsAmount)

    for (const trackLayout of trackLayouts) {
        await LapTime.createAchievedOnTrackLayoutRelationship(lapTime.properties.id, trackLayout.properties.id)
    }

    const relationships = await getRelationshipCollection(
        lapTime.properties.id,
        RelationshipType.LapTimeAchievedOnTrackLayout,
        DbNodeType.TrackLayout,
    )

    expect(relationships.length)
        .toBe(1)
})
