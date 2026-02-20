import type {ControllerNodeType} from "../../../src/controllers/nodes/types/ControllerNodeType"
import {dasherize, pluralize} from 'inflection'

export function getBasePathFragmentForNodeType(nodeType: ControllerNodeType) {
    return dasherize(pluralize(nodeType))
}
