import {describe, expect, test} from 'vitest'
import {Programme} from "../../../../../../../../src/models/node-types/programmes/Programme"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-episode‹ relationship', () => {
    test('PROGRAMME node does not exist', async () => {
        const programme = await seedNode(DbNodeType.Programme)

        await expect(Programme.deleteHasEpisodeRelationship(programme.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PROGRAMME EPISODE node does not exist', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        await expect(Programme.deleteHasEpisodeRelationship(-42, programmeEpisode.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PROGRAMME node and PROGRAMME EPISODE node do not exist', async () => {
        await expect(Programme.deleteHasEpisodeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-episode‹ relationship', async () => {
        const programme = await seedNode(DbNodeType.Programme)
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        await expect(Programme.deleteHasEpisodeRelationship(programme.properties.id, programmeEpisode.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-episode‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Programme, DbNodeType.ProgrammeEpisode, RelationshipType.ProgrammeHasEpisode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeHasEpisode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Programme.deleteHasEpisodeRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeHasEpisode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
