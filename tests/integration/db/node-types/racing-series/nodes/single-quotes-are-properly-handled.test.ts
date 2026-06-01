import {expect, test} from 'vitest'
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {RacingSeriesNode} from "../../../../../../src/db/node-types/racing-series/types/RacingSeriesNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'Formula 1''",
        short_name: "'F1''",
        founded: 1950,
        defunct: null,
        organized_by: "'FIA''",
        vehicle_type: "'open-wheel-cars''",
        country_code: "'US''",
    }

    const createdNode = await createDbNode(DbNodeType.RacingSeries, data) as RacingSeriesNode

    expect(createdNode.properties.name)
        .toEqual("'Formula 1''")

    expect(createdNode.properties.short_name)
        .toEqual("'F1''")

    expect(createdNode.properties.organized_by)
        .toEqual("'FIA''")

    expect(createdNode.properties.vehicle_type)
        .toEqual("'open-wheel-cars''")

    expect(createdNode.properties.country_code)
        .toEqual("'US''")
})
