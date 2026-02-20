import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
        await seedRelationshipForStartNode(sessionResult.id, ControllerNodeType.IMAGE, RelationshipType.SessionResultHasImage)
        await seedRelationshipForStartNode(sessionResult.id, ControllerNodeType.IMAGE, RelationshipType.SessionResultHasImage)

        const relationships = await getRelationshipCollection(
            sessionResult.id,
            RelationshipType.SessionResultHasImage,
            Neo4jNodeType.Image,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

        const relationships = await getRelationshipCollection(
            sessionResult.id,
            RelationshipType.SessionResultHasImage,
            Neo4jNodeType.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.SessionResultHasImage,
            Neo4jNodeType.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
