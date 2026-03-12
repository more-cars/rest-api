import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Programme} from "../../../../../../../../src/models/node-types/programmes/Programme"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A PROGRAMME cannot have multiple ›has-prime-image‹ relationships', async () => {
    const programme = await seedNode(DbNodeType.Programme)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await Programme.createHasPrimeImageRelationship(programme.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(programme.properties.id, RelationshipType.ProgrammeHasPrimeImage)

    expect(relationships.length)
        .toBe(1)
})
