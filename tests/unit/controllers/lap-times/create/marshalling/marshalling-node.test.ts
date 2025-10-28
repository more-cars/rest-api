import {expect, test} from 'vitest'
import {LapTimeNode} from "../../../../../../src/models/lap-times/types/LapTimeNode"
import {marshalNode} from "../../../../../../src/controllers/lap-times/marshalling/marshalNode"

test("marshalling a LAP TIME node", async () => {
    const node: LapTimeNode = {
        id: 1,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
        time: "PT1M33.294S",
        driver_name: "Klaus Ludwig",
        date: "1996-08-03",
    }

    const marshalledNode = marshalNode(node)

    expect(marshalledNode)
        .toStrictEqual({
            data: {
                id: 1,
                time: "PT1M33.294S",
                driver_name: "Klaus Ludwig",
                date: "1996-08-03",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
