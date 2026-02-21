import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A LAP TIME cannot have multiple ›belongs-to-session-result‹ relationships', async () => {
    const lapTime = await seedNode(ControllerNodeType.LapTime)
    const sessionResultsAmount = 3
    const sessionResults = await seedNodes(ControllerNodeType.SessionResult, sessionResultsAmount)

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
