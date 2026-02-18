import type {GamingPlatformNode} from "../../../../models/node-types/gaming-platforms/types/GamingPlatformNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: GamingPlatformNode[]) {
    return marshalNodeCollection(nodes)
}
