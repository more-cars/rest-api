import {expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {Image} from "../../../../../../../src/models/images/Image"

test('IMAGE exists, but has no ›belongs-to-node‹ relationships', async () => {
    const image = await seedImage()

    const relationships = await Image.getAllBelongsToNodeRelationships(image.id)

    expect(relationships.length)
        .toBe(0)
})
