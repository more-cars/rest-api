import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A LAP TIME cannot have multiple ›belongs-to-session-result‹ relationships', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const sessionResultsAmount = 3
    const sessionResults = await seedNodes(DbNodeType.SessionResult, sessionResultsAmount)

    for (const sessionResult of sessionResults) {
        await LapTime.createBelongsToSessionResultRelationship(lapTime.properties.id, sessionResult.properties.id)
    }

    const relationships = await getRelationshipCollection(
        lapTime.properties.id,
        RelationshipType.LapTimeBelongsToSessionResult,
        DbNodeType.SessionResult,
    )

    expect(relationships.length)
        .toBe(1)
})
