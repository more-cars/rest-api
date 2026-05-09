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
import {isMandatory} from "../validators/isMandatory"
import {isNumber} from "../validators/isNumber"
import {isString} from "../validators/isString"
import {isValidIssn} from "../validators/isValidIssn"

export function validateInputData(data: RawInputData, nodeType: NodeType, mode: 'CREATE' | 'UPDATE' = 'CREATE'): boolean {
    let isValid = true

    const properties = getNodeTypeSpecification(nodeType).properties
    properties.forEach((property) => {
        if (property.scope === 'system') {
            return
        }

        if (!property.validation) { // TODO oldschool checks, can be removed after all specs have been updated to contain validation rules
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
        } else {
            if (property.validation.includes('mandatory') && (mode === 'CREATE' || data[property.name] === null)) {
                if (!isMandatory(data[property.name])) {
                    isValid = false
                }
            }

            if (property.validation.includes('string')) {
                if (!isString(data[property.name])) {
                    isValid = false
                }
            }

            if (property.validation.includes('number')) {
                if (!isNumber(data[property.name])) {
                    isValid = false
                }
            }

            if (property.validation.includes('isValidCountryCode')) {
                if (!isValidCountryCode(data[property.name])) {
                    isValid = false
                }
            }

            if (property.validation.includes('isValidCurrencyCode')) {
                if (!isValidCurrencyCode(data[property.name])) {
                    isValid = false
                }
            }

            if (property.validation.includes('isValidIssn')) {
                if (!isValidIssn(data[property.name])) {
                    isValid = false
                }
            }
        }
    })

    return isValid
}
