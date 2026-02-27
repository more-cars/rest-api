import {titleize} from "inflection"
import type {NodeType} from "../../../src/specification/NodeType"

export function convertStringToNodeType(rawNodeType: string) {
    return titleize(rawNodeType) as NodeType
}
