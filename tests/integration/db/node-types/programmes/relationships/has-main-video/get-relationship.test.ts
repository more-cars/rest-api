import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('Requesting a ›has-main-video‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(DbNodeType.Programme, DbNodeType.Video, RelationshipType.ProgrammeHasMainVideo)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.ProgrammeHasMainVideo,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const programme = await seedNode(DbNodeType.Programme)

        const relationships = await getRelationshipCollection(
            programme.properties.id,
            RelationshipType.ProgrammeHasMainVideo,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.ProgrammeHasMainVideo,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
