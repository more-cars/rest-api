import {expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"

test('Requesting the relationship between CAR MODEL and attached IMAGE',
    async () => {
        const carModel = await seedCarModel()
        const image = await seedImage()

        await createRelationship(
            carModel.id,
            image.id,
            DbRelationship.NodeHasImage,
        )

        const relationships = await getRelationshipsForSpecificNode(
            carModel.id,
            DbRelationship.NodeHasImage,
        )

        expect(relationships.length)
            .toBe(1)

        expect(relationships[0].start_node_id)
            .toBe(carModel.id)

        expect(relationships[0].end_node_id)
            .toBe(image.id)
    })
