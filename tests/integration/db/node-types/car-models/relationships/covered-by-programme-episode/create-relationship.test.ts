import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›covered-by-programme-episode‹ relationship', () => {
    test('with valid data', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        const createdRelationship = await createRelationship(
            carModel.properties.id,
            programmeEpisode.properties.id,
            RelationshipType.CarModelCoveredByProgrammeEpisode,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.CarModelCoveredByProgrammeEpisode)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', carModel.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', programmeEpisode.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)

        const createdRelationship = await createRelationship(
            carModel.properties.id,
            -42,
            RelationshipType.CarModelCoveredByProgrammeEpisode,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
