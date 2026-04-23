import {expect, test} from 'vitest'
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {MotorShowNode} from "../../../../../../src/db/node-types/motor-shows/types/MotorShowNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'2017 IAA Frankfurt''",
        date_from: "'2017-09-14''",
        date_until: "'2017-09-24''",
        location: "'Frankfurt''",
        target_audience: "'international''",
        focus: "'new cars''",
        country_code: "'DE''",
    }

    const createdNode = await createNeo4jNode(DbNodeType.MotorShow, data) as MotorShowNode

    expect(createdNode.properties.name)
        .toEqual("'2017 IAA Frankfurt''")

    expect(createdNode.properties.date_from)
        .toEqual("'2017-09-14''")

    expect(createdNode.properties.date_until)
        .toEqual("'2017-09-24''")

    expect(createdNode.properties.location)
        .toEqual("'Frankfurt''")

    expect(createdNode.properties.target_audience)
        .toEqual("'international''")

    expect(createdNode.properties.focus)
        .toEqual("'new cars''")

    expect(createdNode.properties.country_code)
        .toEqual("'DE''")
})
