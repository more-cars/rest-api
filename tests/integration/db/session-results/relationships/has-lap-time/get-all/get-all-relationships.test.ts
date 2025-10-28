import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Requesting all ›has-lap-time‹ relationships', () => {
    test('node and relationships exist', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
        await seedRelationshipForStartNode(sessionResult.id, NodeTypeEnum.LAP_TIME, DbRelationship.SessionResultHasLapTime)
        await seedRelationshipForStartNode(sessionResult.id, NodeTypeEnum.LAP_TIME, DbRelationship.SessionResultHasLapTime)

        const relationships = await getRelationshipsForSpecificNode(
            sessionResult.id,
            DbRelationship.SessionResultHasLapTime,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        const relationships = await getRelationshipsForSpecificNode(
            sessionResult.id,
            DbRelationship.SessionResultHasLapTime,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipsForSpecificNode(
            -42,
            DbRelationship.SessionResultHasLapTime,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
