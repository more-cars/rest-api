import {dasherize} from "inflection"

export function getBasePathFragmentForRelationshipName(relationshipName: string) {
    return dasherize(relationshipName.toLowerCase())
}
