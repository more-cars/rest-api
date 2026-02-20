import {describe, expect, test} from "vitest"
import {seedRelationship} from "../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {RacingEvent} from "../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipById} from "../../../../../src/db/relationships/getRelationshipById"

describe('Creating a n:1 relationship', () => {
    test('expecting the destination node to NOT lose its already existing relationship', async () => {
        const foreignRelationship = await seedRelationship(ControllerNodeType.RACING_EVENT, ControllerNodeType.RACING_SERIES, RelationshipType.RacingEventBelongsToRacingSeries)
        const destinationId = foreignRelationship.end_node.properties.id
        const originId = (await seedNode(ControllerNodeType.RACING_EVENT)).id

        const newRelationship = await RacingEvent.createBelongsToRacingSeriesRelationship(originId, destinationId)
        expect(newRelationship.id)
            .not.to.equal(foreignRelationship.id)
        expect(newRelationship.origin.properties.id)
            .not.to.equal(foreignRelationship.start_node.properties.id)
        expect(newRelationship.destination.properties.id)
            .to.equal(foreignRelationship.end_node.properties.id)

        const refetchedForeignRelationship = await getRelationshipById(foreignRelationship.id)
        expect(refetchedForeignRelationship)
            .toBeTruthy()
    })
})
