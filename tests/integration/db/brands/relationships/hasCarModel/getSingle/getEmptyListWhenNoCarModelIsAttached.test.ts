import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('An empty list should be returned when no CAR MODEL is connected to the BRAND',
    async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)

        const relationships = await getRelationshipCollection(
            brand.id,
            DbRelationship.BrandHasCarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })
