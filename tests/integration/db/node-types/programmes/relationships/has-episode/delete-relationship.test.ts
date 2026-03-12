import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Trying to delete a ›has-episode‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Programme, DbNodeType.ProgrammeEpisode, RelationshipType.ProgrammeHasEpisode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeHasEpisode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeHasEpisode,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeHasEpisode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const programme = await seedNode(DbNodeType.Programme)
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        const relationship = await deleteSpecificRelationship(
            programme.properties.id,
            programmeEpisode.properties.id,
            RelationshipType.ProgrammeHasEpisode,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.ProgrammeHasEpisode,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
