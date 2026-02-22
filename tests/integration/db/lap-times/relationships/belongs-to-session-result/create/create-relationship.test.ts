import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Creating a ›belongs-to-session-result‹ relationship', () => {
    test('with valid data', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)
        const sessionResult = await seedNode(DbNodeType.SessionResult)

        const createdRelationship = await createRelationship(
            lapTime.properties.id,
            sessionResult.properties.id,
            RelationshipType.LapTimeBelongsToSessionResult,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', lapTime.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', sessionResult.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.LapTimeBelongsToSessionResult)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)

        const createdRelationship = await createRelationship(
            lapTime.properties.id,
            -42,
            RelationshipType.LapTimeBelongsToSessionResult,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
