import {convertStringToControllerNodeType} from "../../_toolbox/convertStringToNodeType"
import type {ControllerNode} from "../../../src/controllers/types/ControllerNode"

export function convertNodeResponseToNode(body: any) {
    return {
        node_type: convertStringToControllerNodeType(body.type),
        fields: Object.assign({}, body.attributes, {id: body.id}),
    } satisfies ControllerNode
}
