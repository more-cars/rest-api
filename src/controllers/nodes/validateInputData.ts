import type {RawInputData} from "../types/RawInputData"
import {NodeType} from "../../specification/NodeType"
import {getNodeTypeSpecification} from "../../specification/getNodeTypeSpecification"
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
    })

    return isValid
}
