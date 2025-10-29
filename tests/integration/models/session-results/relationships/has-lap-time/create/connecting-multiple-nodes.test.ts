import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/session-results/SessionResult"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A SESSION RESULT can have multiple ›has-lap-time‹ relationships', async () => {
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const lapTimesAmount = 3
    const lapTimes = await seedNodes(NodeTypeEnum.LAP_TIME, lapTimesAmount)

    for (const lapTime of lapTimes) {
        await SessionResult.createHasLapTimeRelationship(sessionResult.id, lapTime.id)
    }

    const relationships = await getRelationshipCollection(sessionResult.id, DbRelationship.SessionResultHasLapTime)

    expect(relationships.length)
        .toBe(lapTimesAmount)
})
