import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A CAR MODEL cannot have multiple ›belongs-to-brand‹ relationships', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const brandsAmount = 3
    const brands = await seedNodes(ControllerNodeType.BRAND, brandsAmount)

    for (const brand of brands) {
        await CarModel.createBelongsToBrandRelationship(carModel.id, brand.id)
    }

    const relationships = await getRelationshipCollection(
        carModel.id,
        RelationshipType.CarModelBelongsToBrand,
        NodeTypeLabel.Brand,
    )

    expect(relationships.length)
        .toBe(1)
})
