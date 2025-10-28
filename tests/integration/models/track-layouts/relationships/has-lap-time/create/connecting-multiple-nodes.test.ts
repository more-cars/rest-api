import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A TRACK LAYOUT can have multiple ›has-lap-time‹ relationships', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const lapTimesAmount = 3
    const lapTimes = await seedNodes(NodeTypeEnum.LAP_TIME, lapTimesAmount)

    for (const lapTime of lapTimes) {
        await TrackLayout.createHasLapTimeRelationship(trackLayout.id, lapTime.id)
    }

    const relationships = await getRelationshipsForSpecificNode(trackLayout.id, DbRelationship.TrackLayoutHasLapTime)

    expect(relationships.length)
        .toBe(lapTimesAmount)
})
