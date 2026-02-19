import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            sessionResult.id,
            image.id,
            RelationshipType.SessionResultHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', sessionResult.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RelationshipType.SessionResultHasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        const createdRelationship = await createRelationship(
            sessionResult.id,
            -42,
            RelationshipType.SessionResultHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
