import {describe, expect, test} from 'vitest'
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›follows-episode‹ relationship', () => {
    test('PROGRAMME EPISODE node does not exist', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        await expect(ProgrammeEpisode.deleteFollowsEpisodeRelationship(programmeEpisode.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PARTNER node does not exist', async () => {
        const partner = await seedNode(DbNodeType.ProgrammeEpisode)

        await expect(ProgrammeEpisode.deleteFollowsEpisodeRelationship(-42, partner.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PROGRAMME EPISODE node and PARTNER node do not exist', async () => {
        await expect(ProgrammeEpisode.deleteFollowsEpisodeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›follows-episode‹ relationship', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
        const partner = await seedNode(DbNodeType.ProgrammeEpisode)

        await expect(ProgrammeEpisode.deleteFollowsEpisodeRelationship(programmeEpisode.properties.id, partner.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›follows-episode‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.ProgrammeEpisode, DbNodeType.ProgrammeEpisode, RelationshipType.ProgrammeEpisodeFollowsEpisode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeEpisodeFollowsEpisode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await ProgrammeEpisode.deleteFollowsEpisodeRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeEpisodeFollowsEpisode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
