import {ImageNode} from "../../../../models/node-types/images/types/ImageNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: ImageNode[]) {
    return marshalNodeCollection(nodes)
}
