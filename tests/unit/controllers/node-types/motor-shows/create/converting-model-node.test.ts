import {expect, test} from 'vitest'
import {MotorShowNode} from "../../../../../../src/models/node-types/motor-shows/types/MotorShowNode"
import {ModelNodeType} from "../../../../../../src/models/types/ModelNodeType"
import {convertMotorShowModelNodeToControllerNode} from "../../../../../../src/controllers/node-types/motor-shows/convertMotorShowModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"

test("converting a MOTOR SHOW node", async () => {
    const node: MotorShowNode = {
        node_type: ModelNodeType.MotorShow,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "2017 IAA Frankfurt",
            date_from: "2017-09-14",
            date_until: "2017-09-24",
            location: "Frankfurt",
            target_audience: "international",
            focus: "new cars",
        },
    }

    const convertedNode = convertMotorShowModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.MotorShow,
            fields: {
                id: 1,
                name: "2017 IAA Frankfurt",
                date_from: "2017-09-14",
                date_until: "2017-09-24",
                location: "Frankfurt",
                target_audience: "international",
                focus: "new cars",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            },
        })
})
