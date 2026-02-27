import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Magazine} from "../../../../../../../../src/models/node-types/magazines/Magazine"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MAGAZINE cannot have multiple ›has-prime-image‹ relationships', async () => {
    const magazine = await seedNode(DbNodeType.Magazine)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await Magazine.createHasPrimeImageRelationship(magazine.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(magazine.properties.id, RelationshipType.MagazineHasPrimeImage)

    expect(relationships.length)
        .toBe(1)
})
