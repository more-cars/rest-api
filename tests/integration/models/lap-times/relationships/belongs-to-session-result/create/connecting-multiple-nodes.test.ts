import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

test('A LAP TIME cannot have multiple ›belongs-to-session-result‹ relationships', async () => {
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const sessionResultsAmount = 3
    const sessionResults = await seedNodes(ControllerNodeType.SESSION_RESULT, sessionResultsAmount)

    for (const sessionResult of sessionResults) {
        await LapTime.createBelongsToSessionResultRelationship(lapTime.id, sessionResult.id)
    }

    const relationships = await getRelationshipCollection(
        lapTime.id,
        RelationshipType.LapTimeBelongsToSessionResult,
        Neo4jNodeType.SessionResult,
    )

    expect(relationships.length)
        .toBe(1)
})
