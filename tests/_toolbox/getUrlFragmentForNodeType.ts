import type {NodeType} from "../../src/specification/NodeType"
import {dasherize, pluralize} from "inflection"

export function getUrlFragmentForNodeType(nodeType: NodeType) {
    return dasherize(pluralize(nodeType.toLowerCase()))
}
