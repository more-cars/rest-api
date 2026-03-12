import {describe, expect, test} from 'vitest'
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('PROGRAMME EPISODE node does not exist', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

        await expect(ProgrammeEpisode.deleteHasPrimeImageRelationship(programmeEpisode.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(DbNodeType.Image)

        await expect(ProgrammeEpisode.deleteHasPrimeImageRelationship(-42, image.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PROGRAMME EPISODE node and IMAGE node do not exist', async () => {
        await expect(ProgrammeEpisode.deleteHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
        const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
        const image = await seedNode(DbNodeType.Image)

        await expect(ProgrammeEpisode.deleteHasPrimeImageRelationship(programmeEpisode.properties.id, image.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-prime-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.ProgrammeEpisode, DbNodeType.Image, RelationshipType.ProgrammeEpisodeHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeEpisodeHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await ProgrammeEpisode.deleteHasPrimeImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ProgrammeEpisodeHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
