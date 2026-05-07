import type {RawInputData} from "../types/RawInputData"
import {NodeType} from "../../specification/NodeType"
import {getNodeTypeSpecification} from "../../specification/getNodeTypeSpecification"
import {isMandatoryString} from "../validators/isMandatoryString"
import {isOptionalString} from "../validators/isOptionalString"
import {isMandatoryNumber} from "../validators/isMandatoryNumber"
import {isOptionalNumber} from "../validators/isOptionalNumber"

export function validateInputData(data: RawInputData, nodeType: NodeType): boolean {
    let isValid = true

    const properties = getNodeTypeSpecification(nodeType).properties
    properties.forEach((property) => {
        if (property.datatype === 'string' && property.mandatory) {
            if (!isMandatoryString(data[property.name])) {
                isValid = false
            }
        }

        if (property.datatype === 'string' && !property.mandatory) {
            if (!isOptionalString(data[property.name])) {
                isValid = false
            }
        }

        if (property.datatype === 'number' && property.mandatory) {
            if (!isMandatoryNumber(data[property.name])) {
                isValid = false
            }
        }

        if (property.datatype === 'number' && !property.mandatory) {
            if (!isOptionalNumber(data[property.name])) {
                isValid = false
            }
        }
    })

    return isValid
}
