import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›covered-by-programme-episode‹ relationship', () => {
    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)

        await expect(CarModel.deleteCoveredByProgrammeEpisodeRelationship(carModel.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PROGRAMME EPISODE node does not exist', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        await expect(CarModel.deleteCoveredByProgrammeEpisodeRelationship(-42, programmeEpisode.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node and PROGRAMME EPISODE node do not exist', async () => {
        await expect(CarModel.deleteCoveredByProgrammeEpisodeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›covered-by-programme-episode‹ relationship', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        await expect(CarModel.deleteCoveredByProgrammeEpisodeRelationship(carModel.properties.id, programmeEpisode.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›covered-by-programme-episode‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.CarModel, DbNodeType.ProgrammeEpisode, RelationshipType.CarModelCoveredByProgrammeEpisode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelCoveredByProgrammeEpisode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModel.deleteCoveredByProgrammeEpisodeRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelCoveredByProgrammeEpisode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
