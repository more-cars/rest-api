import {describe, expect, test} from "vitest"
import {seedRelationship} from "../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {RacingEvent} from "../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipById} from "../../../../../src/db/relationships/getRelationshipById"

describe('Creating a 1:1 relationship', () => {
    test('expecting the destination node to lose its already existing relationship', async () => {
        const foreignRelationship = await seedRelationship(ControllerNodeType.RACING_EVENT, ControllerNodeType.RACING_EVENT, RelationshipType.RacingEventIsFollowedByEvent)
        const destinationId = foreignRelationship.end_node.properties.id
        const originId = (await seedNode(ControllerNodeType.RACING_EVENT)).properties.id

        const newRelationship = await RacingEvent.createIsFollowedByEventRelationship(originId, destinationId)
        expect(newRelationship.id)
            .not.to.equal(foreignRelationship.id)
        expect(newRelationship.origin.attributes.id)
            .not.to.equal(foreignRelationship.start_node.properties.id)
        expect(newRelationship.destination.attributes.id)
            .to.equal(foreignRelationship.end_node.properties.id)

        const refetchedForeignRelationship = await getRelationshipById(foreignRelationship.id)
        expect(refetchedForeignRelationship)
            .toBeFalsy()
    })
})
