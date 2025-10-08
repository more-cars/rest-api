import {marshalHasImageRelationship} from "./marshalHasImageRelationship"
import {CarModelHasImageRelationship} from "../../../models/car-models/types/CarModelHasImageRelationship"
import {CarModelHasImageResponse} from "../types/CarModelHasImageResponse"

export function marshalHasImageRelationships(relationships: Array<CarModelHasImageRelationship>) {
    const responseObjects: Array<CarModelHasImageResponse> = []

    relationships.forEach((relationship) => {
        responseObjects.push(marshalHasImageRelationship(relationship))
    })

    return responseObjects
}
