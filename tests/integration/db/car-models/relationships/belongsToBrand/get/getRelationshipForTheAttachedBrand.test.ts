import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('Requesting the relationship between CAR MODEL and attached BRAND',
    async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
        const brand = await seedNode(NodeTypeEnum.BRAND)

        await createRelationship(
            carModel.id,
            brand.id,
            DbRelationship.CarModelBelongsToBrand,
        )

        const relationships = await getRelationshipCollection(
            carModel.id,
            DbRelationship.CarModelBelongsToBrand,
            NodeTypeLabel.Brand,
        )

        expect(relationships.length)
            .toBe(1)

        expect(relationships[0].start_node_id)
            .toBe(carModel.id)

        expect(relationships[0].end_node_id)
            .toBe(brand.id)
    })
