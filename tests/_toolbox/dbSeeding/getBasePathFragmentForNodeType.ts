import type {NodeTypeEnum} from "../../../src/controllers/nodes/types/NodeTypeEnum"
import {dasherize, pluralize} from 'inflection'

export function getBasePathFragmentForNodeType(nodeType: NodeTypeEnum) {
    return dasherize(pluralize(nodeType))
}
