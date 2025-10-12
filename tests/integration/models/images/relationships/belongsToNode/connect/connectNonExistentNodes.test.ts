import {expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Image} from "../../../../../../../src/models/images/Image"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-node‹ relationship with nodes that do not exist', async () => {
    const image = await seedImage()
    const company = await seedCompany()

    await expect(Image.createBelongsToNodeRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Image.createBelongsToNodeRelationship(company.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Image.createBelongsToNodeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
