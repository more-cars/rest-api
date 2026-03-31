import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-video‹ relationship with nodes that do not exist', async () => {
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
    const video = await seedNode(DbNodeType.Video)

    await expect(ModelCarBrand.createHasVideoRelationship(-42, video.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ModelCarBrand.createHasVideoRelationship(modelCarBrand.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ModelCarBrand.createHasVideoRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
