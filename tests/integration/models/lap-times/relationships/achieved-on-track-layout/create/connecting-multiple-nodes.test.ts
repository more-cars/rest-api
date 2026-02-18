import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A LAP TIME cannot have multiple ›achieved-on-track-layout‹ relationships', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(NodeTypeEnum.TRACK_LAYOUT, trackLayoutsAmount)

    for (const trackLayout of trackLayouts) {
        await LapTime.createAchievedOnTrackLayoutRelationship(lapTime.id, trackLayout.id)
    }

    const relationships = await getRelationshipCollection(
        lapTime.id,
        RelationshipType.LapTimeAchievedOnTrackLayout,
        NodeTypeLabel.TrackLayout,
    )

    expect(relationships.length)
        .toBe(1)
})
