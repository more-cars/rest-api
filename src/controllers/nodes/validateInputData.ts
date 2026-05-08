import type {RawInputData} from "../types/RawInputData"
import {NodeType} from "../../specification/NodeType"
import {getNodeTypeSpecification} from "../../specification/getNodeTypeSpecification"
import {isMandatoryString} from "../validators/isMandatoryString"
import {isOptionalString} from "../validators/isOptionalString"
import {isMandatoryNumber} from "../validators/isMandatoryNumber"
import {isOptionalNumber} from "../validators/isOptionalNumber"
import {isValidImagePlatform} from "../validators/isValidImagePlatform"
import {isValidVideoPlatform} from "../validators/isValidVideoPlatform"
import {isValidCountryCode} from "../validators/isValidCountryCode"
import {isValidCurrencyCode} from "../validators/isValidCurrencyCode"

export function validateInputData(data: RawInputData, nodeType: NodeType, onlyCheckTheseProperties?: string[]): boolean {
    let isValid = true

    const properties = getNodeTypeSpecification(nodeType).properties
    properties.forEach((property) => {
        if (onlyCheckTheseProperties) {
            if (!onlyCheckTheseProperties.includes(property.name)) {
                return
            }
        }

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

        if (property.validation === 'isValidCountryCode') {
            if (!isValidCountryCode(data[property.name])) {
                isValid = false
            }
        }

        if (property.validation === 'isValidCurrencyCode') {
            if (!isValidCurrencyCode(data[property.name])) {
                isValid = false
            }
        }

        if (property.name === 'image_provider') {
            if (!isValidImagePlatform(data[property.name])) {
                isValid = false
            }
        }

        if (property.name === 'video_provider') {
            if (!isValidVideoPlatform(data[property.name])) {
                isValid = false
            }
        }
    })

    return isValid
}
