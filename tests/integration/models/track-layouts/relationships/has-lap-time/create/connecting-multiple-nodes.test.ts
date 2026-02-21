import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A TRACK LAYOUT can have multiple ›has-lap-time‹ relationships', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TrackLayout)
    const lapTimesAmount = 3
    const lapTimes = await seedNodes(ControllerNodeType.LapTime, lapTimesAmount)

    for (const lapTime of lapTimes) {
        await TrackLayout.createHasLapTimeRelationship(trackLayout.properties.id, lapTime.properties.id)
    }

    const relationships = await getRelationshipCollection(
        trackLayout.properties.id,
        RelationshipType.TrackLayoutHasLapTime,
        DbNodeType.LapTime,
    )

    expect(relationships.length)
        .toBe(lapTimesAmount)
})
