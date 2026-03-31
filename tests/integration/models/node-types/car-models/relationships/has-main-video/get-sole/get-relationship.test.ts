import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {validateJson} from "../../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a ›has-main-video‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.CarModel, DbNodeType.Video, RelationshipType.CarModelHasMainVideo)
        const expectedCarModelId = expectedRelationship.start_node.properties.id
        const expectedVideoId = expectedRelationship.end_node.properties.id
        const actualRelationship = await CarModel.getHasMainVideoRelationship(expectedCarModelId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedCarModelId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedVideoId)
    })

    test('node exists, but not the relationship', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)

        await expect(CarModel.getHasMainVideoRelationship(carModel.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(CarModel.getHasMainVideoRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
