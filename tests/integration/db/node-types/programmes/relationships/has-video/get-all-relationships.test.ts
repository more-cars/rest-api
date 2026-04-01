import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›has-video‹ relationships', () => {
    test('node and relationships exist', async () => {
        const programme = await seedNode(DbNodeType.Programme)
        await seedRelationshipForStartNode(programme.properties.id, DbNodeType.Video, RelationshipType.ProgrammeHasVideo)
        await seedRelationshipForStartNode(programme.properties.id, DbNodeType.Video, RelationshipType.ProgrammeHasVideo)

        const relationships = await getRelationshipCollection(
            programme.properties.id,
            RelationshipType.ProgrammeHasVideo,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const programme = await seedNode(DbNodeType.Programme)

        const relationships = await getRelationshipCollection(
            programme.properties.id,
            RelationshipType.ProgrammeHasVideo,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.ProgrammeHasVideo,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
