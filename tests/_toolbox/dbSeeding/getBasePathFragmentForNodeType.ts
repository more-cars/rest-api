import type {NodeType} from "../NodeType"
import {dasherize, pluralize} from 'inflection'

export async function getBasePathFragmentForNodeType(nodeType: NodeType) {
    return dasherize(pluralize(nodeType))
}
