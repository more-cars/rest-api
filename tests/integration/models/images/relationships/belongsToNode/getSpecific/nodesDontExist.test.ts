import {describe, expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {Image} from "../../../../../../../src/models/images/Image"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a specific ›belongs-to-node‹ relationship', () => {
    test('with an IMAGE that does not exist', async () => {
        const carModel = await seedCarModel()

        await expect(Image.getSpecificBelongsToNodeRelationship(-42, carModel.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('with a partner node that does not exist', async () => {
        const image = await seedImage()

        await expect(CarModel.getSpecificHasPrimeImageRelationship(image.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('with an IMAGE and partner node that do not exist', async () => {
        await expect(Image.getSpecificBelongsToNodeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
