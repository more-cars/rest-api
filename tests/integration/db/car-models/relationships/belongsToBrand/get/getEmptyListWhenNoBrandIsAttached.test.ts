import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('An empty list should be returned when no BRAND is connected to the CAR MODEL',
    async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        const relationships = await getRelationshipCollection(
            carModel.id,
            DbRelationship.BrandHasCarModel,
            NodeTypeLabel.CarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })
