import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {SessionResult} from "../../../../../../../../src/models/node-types/session-results/SessionResult"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A SESSION RESULT can have multiple ›has-lap-time‹ relationships', async () => {
    const sessionResult = await seedNode(DbNodeType.SessionResult)
    const lapTimesAmount = 3
    const lapTimes = await seedNodes(DbNodeType.LapTime, lapTimesAmount)

    for (const lapTime of lapTimes) {
        await SessionResult.createHasLapTimeRelationship(sessionResult.properties.id, lapTime.properties.id)
    }

    const relationships = await getRelationshipCollection(
        sessionResult.properties.id,
        RelationshipType.SessionResultHasLapTime,
        DbNodeType.LapTime,
    )

    expect(relationships.length)
        .toBe(lapTimesAmount)
})
