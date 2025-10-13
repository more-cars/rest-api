import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Image} from "../../../../../../../src/models/images/Image"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Both nodes exist, but have no relationship', async () => {
    const image = await seedNode('image')
    const partnerNode = await seedNode('company')

    await expect(Image.deleteBelongsToNodeRelationship(image.id, partnerNode.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
