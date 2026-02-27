import {dasherize, pluralize} from 'inflection'

export function getBasePathFragmentForNodeType(nodeType: string) {
    return dasherize(pluralize(nodeType.toLowerCase()))
}
