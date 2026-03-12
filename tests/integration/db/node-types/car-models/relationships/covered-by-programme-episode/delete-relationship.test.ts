import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Trying to delete a ›covered-by-programme-episode‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.CarModel, DbNodeType.ProgrammeEpisode, RelationshipType.CarModelCoveredByProgrammeEpisode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelCoveredByProgrammeEpisode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelCoveredByProgrammeEpisode,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelCoveredByProgrammeEpisode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        const relationship = await deleteSpecificRelationship(
            carModel.properties.id,
            programmeEpisode.properties.id,
            RelationshipType.CarModelCoveredByProgrammeEpisode,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.CarModelCoveredByProgrammeEpisode,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
