import {expect, test} from 'vitest'
import {LapTimeNode} from "../../../../../src/models/node-types/lap-times/types/LapTimeNode"
import {marshalNode} from "../../../../../src/controllers/node-types/lap-times/marshalling/marshalNode"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"

test("marshalling a LAP TIME node", async () => {
    const node: LapTimeNode = {
        node_type: ModelNodeType.LapTime,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            time: "PT1M33.294S",
            driver_name: "Klaus Ludwig",
            date: "1996-08-03",
        }
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
