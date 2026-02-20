import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Requesting a ›belongs-to-session-result‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(ControllerNodeType.LAP_TIME, ControllerNodeType.SESSION_RESULT, RelationshipType.LapTimeBelongsToSessionResult)

        const relationships = await getRelationshipCollection(
            relationship.start_node.id,
            RelationshipType.LapTimeBelongsToSessionResult,
            DbNodeType.SessionResult,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

        const relationships = await getRelationshipCollection(
            lapTime.id,
            RelationshipType.LapTimeBelongsToSessionResult,
            DbNodeType.SessionResult,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.LapTimeBelongsToSessionResult,
            DbNodeType.SessionResult,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
