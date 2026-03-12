import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A PROGRAMME EPISODE cannot have multiple ›has-prime-image‹ relationships', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await ProgrammeEpisode.createHasPrimeImageRelationship(programmeEpisode.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(programmeEpisode.properties.id, RelationshipType.ProgrammeEpisodeHasPrimeImage)

    expect(relationships.length)
        .toBe(1)
})
