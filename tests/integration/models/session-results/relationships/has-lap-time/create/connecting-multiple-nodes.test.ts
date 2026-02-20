import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

test('A SESSION RESULT can have multiple ›has-lap-time‹ relationships', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
    const lapTimesAmount = 3
    const lapTimes = await seedNodes(ControllerNodeType.LAP_TIME, lapTimesAmount)

    for (const lapTime of lapTimes) {
        await SessionResult.createHasLapTimeRelationship(sessionResult.id, lapTime.id)
    }

    const relationships = await getRelationshipCollection(
        sessionResult.id,
        RelationshipType.SessionResultHasLapTime,
        Neo4jNodeType.LapTime,
    )

    expect(relationships.length)
        .toBe(lapTimesAmount)
})
