import {expect, test} from 'vitest'
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {LapTimeNode} from "../../../../../../src/db/node-types/lap-times/types/LapTimeNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        time: "'PT1M33.294S''",
        driver_name: "'Klaus Ludwig''",
        date: "'1996-08-03''",
    }

    const createdNode = await createDbNode(DbNodeType.LapTime, data) as LapTimeNode

    expect(createdNode.properties.time)
        .toEqual("'PT1M33.294S''")

    expect(createdNode.properties.driver_name)
        .toEqual("'Klaus Ludwig''")

    expect(createdNode.properties.date)
        .toEqual("'1996-08-03''")
})
