import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Image} from "../../../../../../../src/models/images/Image"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Both nodes exist, but have no ›belongs-to-node‹ relationship', async () => {
    const image = await seedNode('image')
    const partner = await seedNode('company')

    await expect(Image.getSpecificBelongsToNodeRelationship(image.id, partner.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
