import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/racing-events/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {RacingEventSchema} from "../../../../../_toolbox/schemas/db/RacingEventSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a RACING EVENT that does not exist should return "false"', async () => {
    const expectedRacingEventNode = false
    const actualRacingEventNode = await getNodeById(-42)

    expect(actualRacingEventNode)
        .toBe(expectedRacingEventNode)
})

test('Querying an existing RACING EVENT should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.RacingEvent)
    const racingEventNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(racingEventNode, RacingEventSchema))
        .toBeTruthy()
})
