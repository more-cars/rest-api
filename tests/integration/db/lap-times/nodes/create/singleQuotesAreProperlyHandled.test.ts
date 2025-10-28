import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/lap-times/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        time: "'PT1M33.294S''",
        driver_name: "'Klaus Ludwig''",
        date: "'1996-08-03''",
    }

    const createdNode = await createNode(data)

    expect(createdNode.time)
        .toEqual("'PT1M33.294S''")

    expect(createdNode.driver_name)
        .toEqual("'Klaus Ludwig''")

    expect(createdNode.date)
        .toEqual("'1996-08-03''")
})
