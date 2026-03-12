import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›covers-car-model‹ relationships', () => {
    test('node and relationships exist', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
        await seedRelationshipForStartNode(programmeEpisode.properties.id, DbNodeType.CarModel, RelationshipType.ProgrammeEpisodeCoversCarModel)
        await seedRelationshipForStartNode(programmeEpisode.properties.id, DbNodeType.CarModel, RelationshipType.ProgrammeEpisodeCoversCarModel)

        const relationships = await getRelationshipCollection(
            programmeEpisode.properties.id,
            RelationshipType.ProgrammeEpisodeCoversCarModel,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        const relationships = await getRelationshipCollection(
            programmeEpisode.properties.id,
            RelationshipType.ProgrammeEpisodeCoversCarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.ProgrammeEpisodeCoversCarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
