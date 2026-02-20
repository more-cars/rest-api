import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A LAP TIME cannot have multiple ›achieved-on-track-layout‹ relationships', async () => {
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(ControllerNodeType.TRACK_LAYOUT, trackLayoutsAmount)

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
