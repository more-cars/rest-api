import {describe, expect, test} from 'vitest'
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›belongs-to-programme‹ relationship', () => {
    test('PROGRAMME EPISODE node does not exist', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        await expect(ProgrammeEpisode.deleteBelongsToProgrammeRelationship(programmeEpisode.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PROGRAMME node does not exist', async () => {
        const programme = await seedNode(DbNodeType.Programme)

        await expect(ProgrammeEpisode.deleteBelongsToProgrammeRelationship(-42, programme.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PROGRAMME EPISODE node and PROGRAMME node do not exist', async () => {
        await expect(ProgrammeEpisode.deleteBelongsToProgrammeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-programme‹ relationship', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
        const programme = await seedNode(DbNodeType.Programme)

        await expect(ProgrammeEpisode.deleteBelongsToProgrammeRelationship(programmeEpisode.properties.id, programme.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-programme‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.ProgrammeEpisode, DbNodeType.Programme, RelationshipType.ProgrammeEpisodeBelongsToProgramme)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeEpisodeBelongsToProgramme,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await ProgrammeEpisode.deleteBelongsToProgrammeRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeEpisodeBelongsToProgramme,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
