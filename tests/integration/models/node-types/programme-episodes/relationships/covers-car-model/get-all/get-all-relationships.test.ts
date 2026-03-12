import {describe, expect, test} from 'vitest'
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›covers-car-model‹ relationships', () => {
    test('node and relationships exist', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
        await seedRelationshipForStartNode(programmeEpisode.properties.id, DbNodeType.CarModel, RelationshipType.ProgrammeEpisodeCoversCarModel)
        await seedRelationshipForStartNode(programmeEpisode.properties.id, DbNodeType.CarModel, RelationshipType.ProgrammeEpisodeCoversCarModel)

        const relationships = await ProgrammeEpisode.getAllCoversCarModelRelationships(programmeEpisode.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        const relationships = await ProgrammeEpisode.getAllCoversCarModelRelationships(programmeEpisode.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(ProgrammeEpisode.getAllCoversCarModelRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
