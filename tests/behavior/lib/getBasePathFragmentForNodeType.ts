import type {ControllerNodeType} from "../../../src/controllers/types/ControllerNodeType"
import {dasherize, pluralize} from 'inflection'

export function getBasePathFragmentForNodeType(nodeType: ControllerNodeType) {
    return dasherize(pluralize(nodeType.toLowerCase()))
}
