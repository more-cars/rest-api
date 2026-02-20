import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A TRACK LAYOUT can have multiple ›has-lap-time‹ relationships', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const lapTimesAmount = 3
    const lapTimes = await seedNodes(ControllerNodeType.LAP_TIME, lapTimesAmount)

    for (const lapTime of lapTimes) {
        await TrackLayout.createHasLapTimeRelationship(trackLayout.id, lapTime.id)
    }

    const relationships = await getRelationshipCollection(
        trackLayout.id,
        RelationshipType.TrackLayoutHasLapTime,
        NodeTypeLabel.LapTime,
    )

    expect(relationships.length)
        .toBe(lapTimesAmount)
})
