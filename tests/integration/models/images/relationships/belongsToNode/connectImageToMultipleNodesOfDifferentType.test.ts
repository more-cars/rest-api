import {Image} from "../../../../../../src/models/images/Image"
import {seedImage} from "../../../../../dbSeeding/images/nodes/seedImage"
import {seedBrand} from "../../../../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../dbSeeding/car-models/nodes/seedCarModel"

describe('Image', () => {
    test('An image can be connected to multiple other nodes from different types', async () => {
        const imageNode = await seedImage()
        const brandNode1 = await seedBrand()
        const brandNode2 = await seedBrand()
        const carModelNode1 = await seedCarModel()
        const carModelNode2 = await seedCarModel()

        const createdRelationship1 = await Image.createBelongsToNodeRelationship(imageNode.id, brandNode1.id)
        expect(createdRelationship1).not.toBeFalsy()

        const createdRelationship2 = await Image.createBelongsToNodeRelationship(imageNode.id, brandNode2.id)
        expect(createdRelationship2).not.toBeFalsy()

        const createdRelationship3 = await Image.createBelongsToNodeRelationship(imageNode.id, carModelNode1.id)
        expect(createdRelationship3).not.toBeFalsy()

        const createdRelationship4 = await Image.createBelongsToNodeRelationship(imageNode.id, carModelNode2.id)
        expect(createdRelationship4).not.toBeFalsy()
    })
})
