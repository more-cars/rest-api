import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Trying to delete a ›is-followed-by-episode‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.ProgrammeEpisode, DbNodeType.ProgrammeEpisode, RelationshipType.ProgrammeEpisodeIsFollowedByEpisode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeEpisodeIsFollowedByEpisode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeEpisodeIsFollowedByEpisode,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeEpisodeIsFollowedByEpisode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
        const partner = await seedNode(DbNodeType.ProgrammeEpisode)

        const relationship = await deleteSpecificRelationship(
            programmeEpisode.properties.id,
            partner.properties.id,
            RelationshipType.ProgrammeEpisodeIsFollowedByEpisode,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.ProgrammeEpisodeIsFollowedByEpisode,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
