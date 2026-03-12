import {describe, expect, test} from 'vitest'
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›covers-car-model‹ relationship', () => {
    test('PROGRAMME EPISODE node does not exist', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        await expect(ProgrammeEpisode.deleteCoversCarModelRelationship(programmeEpisode.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)

        await expect(ProgrammeEpisode.deleteCoversCarModelRelationship(-42, carModel.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PROGRAMME EPISODE node and CAR MODEL node do not exist', async () => {
        await expect(ProgrammeEpisode.deleteCoversCarModelRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›covers-car-model‹ relationship', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
        const carModel = await seedNode(DbNodeType.CarModel)

        await expect(ProgrammeEpisode.deleteCoversCarModelRelationship(programmeEpisode.properties.id, carModel.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›covers-car-model‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.ProgrammeEpisode, DbNodeType.CarModel, RelationshipType.ProgrammeEpisodeCoversCarModel)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeEpisodeCoversCarModel,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await ProgrammeEpisode.deleteCoversCarModelRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeEpisodeCoversCarModel,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
