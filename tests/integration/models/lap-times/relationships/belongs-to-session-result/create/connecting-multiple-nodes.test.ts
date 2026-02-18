import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A LAP TIME cannot have multiple ›belongs-to-session-result‹ relationships', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const sessionResultsAmount = 3
    const sessionResults = await seedNodes(NodeTypeEnum.SESSION_RESULT, sessionResultsAmount)

    for (const sessionResult of sessionResults) {
        await LapTime.createBelongsToSessionResultRelationship(lapTime.id, sessionResult.id)
    }

    const relationships = await getRelationshipCollection(
        lapTime.id,
        RelationshipType.LapTimeBelongsToSessionResult,
        NodeTypeLabel.SessionResult,
    )

    expect(relationships.length)
        .toBe(1)
})
