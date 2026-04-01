import {describe, expect, test} from 'vitest'
import {Programme} from "../../../../../../../../src/models/node-types/programmes/Programme"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-video‹ relationships', () => {
    test('node and relationships exist', async () => {
        const programme = await seedNode(DbNodeType.Programme)
        await seedRelationshipForStartNode(programme.properties.id, DbNodeType.Video, RelationshipType.ProgrammeHasVideo)
        await seedRelationshipForStartNode(programme.properties.id, DbNodeType.Video, RelationshipType.ProgrammeHasVideo)

        const relationships = await Programme.getAllHasVideoRelationships(programme.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const programme = await seedNode(DbNodeType.Programme)

        const relationships = await Programme.getAllHasVideoRelationships(programme.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Programme.getAllHasVideoRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
