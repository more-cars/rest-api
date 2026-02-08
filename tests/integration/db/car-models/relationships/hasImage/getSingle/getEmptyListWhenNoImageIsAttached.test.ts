import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('An empty list should be returned when no IMAGE is connected to the CAR MODEL',
    async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        const relationships = await getRelationshipCollection(
            carModel.id,
            DbRelationship.NodeHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })
