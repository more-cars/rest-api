import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›is-followed-by-episode‹ relationship', () => {
    test('with valid data', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
        const partner = await seedNode(DbNodeType.ProgrammeEpisode)

        const createdRelationship = await createRelationship(
            programmeEpisode.properties.id,
            partner.properties.id,
            RelationshipType.ProgrammeEpisodeIsFollowedByEpisode,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.ProgrammeEpisodeIsFollowedByEpisode)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', programmeEpisode.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', partner.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        const createdRelationship = await createRelationship(
            programmeEpisode.properties.id,
            -42,
            RelationshipType.ProgrammeEpisodeIsFollowedByEpisode,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
