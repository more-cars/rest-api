import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
        await seedRelationshipForStartNode(sessionResult.id, NodeTypeEnum.IMAGE, DbRelationship.SessionResultHasImage)
        await seedRelationshipForStartNode(sessionResult.id, NodeTypeEnum.IMAGE, DbRelationship.SessionResultHasImage)

        const relationships = await getRelationshipCollection(
            sessionResult.id,
            DbRelationship.SessionResultHasImage,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        const relationships = await getRelationshipCollection(
            sessionResult.id,
            DbRelationship.SessionResultHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.SessionResultHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
