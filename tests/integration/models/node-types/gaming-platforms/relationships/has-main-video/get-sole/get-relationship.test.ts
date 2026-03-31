import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {GamingPlatform} from "../../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {validateJson} from "../../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a ›has-main-video‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.GamingPlatform, DbNodeType.Video, RelationshipType.GamingPlatformHasMainVideo)
        const expectedGamingPlatformId = expectedRelationship.start_node.properties.id
        const expectedVideoId = expectedRelationship.end_node.properties.id
        const actualRelationship = await GamingPlatform.getHasMainVideoRelationship(expectedGamingPlatformId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedGamingPlatformId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedVideoId)
    })

    test('node exists, but not the relationship', async () => {
        const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)

        await expect(GamingPlatform.getHasMainVideoRelationship(gamingPlatform.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(GamingPlatform.getHasMainVideoRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
