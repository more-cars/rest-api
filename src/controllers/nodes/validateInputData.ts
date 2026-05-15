import type {RawInputData} from "../types/RawInputData"
import {NodeType} from "../../specification/NodeType"
import {getNodeTypeSpecification} from "../../specification/getNodeTypeSpecification"
import {isMandatory} from "../validators/isMandatory"
import {isString} from "../validators/isString"
import {isNumber} from "../validators/isNumber"
import {isValidImageProvider} from "../validators/isValidImageProvider"
import {isValidVideoProvider} from "../validators/isValidVideoProvider"
import {isValidCountryCode} from "../validators/isValidCountryCode"
import {isValidCurrencyCode} from "../validators/isValidCurrencyCode"
import {isValidIssn} from "../validators/isValidIssn"
import {isValidWeightUnit} from "../validators/isValidWeightUnit"
import {isValidPowerUnit} from "../validators/isValidPowerUnit"
import type {ValidationRule} from "../../specification/ValidationRule"
import {isValidAirInduction} from "../validators/isValidAirInduction"
import {isValidBodyStyle} from "../validators/isValidBodyStyle"
import {isValidCapacityUnit} from "../validators/isValidCapacityUnit"
import {isValidConsumptionUnit} from "../validators/isValidConsumptionUnit"
import {isValidDisplacementUnit} from "../validators/isValidDisplacementUnit"
import {isValidDrivetrain} from "../validators/isValidDrivetrain"
import {isValidEnergySource} from "../validators/isValidEnergySource"
import {isValidEngineConfiguration} from "../validators/isValidEngineConfiguration"
import {isValidEngineType} from "../validators/isValidEngineType"
import {isValidSpeedUnit} from "../validators/isValidSpeedUnit"
import {isValidTorqueUnit} from "../validators/isValidTorqueUnit"
import {isValidTransmission} from "../validators/isValidTransmission"

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

        property.validation.forEach((validationRule) => {
            if (validationRule === 'mandatory') {
                return
            }

            if (!validate(data[property.name], validationRule)) {
                console.log(validationRule)
                isValid = false
            }
        })
    })

    return isValid
}

function validate(value: unknown, validationRule: ValidationRule) {
    const mapping = new Map<ValidationRule, (value: unknown) => boolean>([
        ['mandatory', isMandatory],
        ['imageProvider', isValidImageProvider],
        ['videoProvider', isValidVideoProvider],
        ['airInduction', isValidAirInduction],
        ['bodyStyle', isValidBodyStyle],
        ['capacityUnit', isValidCapacityUnit],
        ['consumptionUnit', isValidConsumptionUnit],
        ['displacementUnit', isValidDisplacementUnit],
        ['drivetrain', isValidDrivetrain],
        ['energySource', isValidEnergySource],
        ['engineConfiguration', isValidEngineConfiguration],
        ['engineType', isValidEngineType],
        ['powerUnit', isValidPowerUnit],
        ['speedUnit', isValidSpeedUnit],
        ['torqueUnit', isValidTorqueUnit],
        ['transmission', isValidTransmission],
        ['weightUnit', isValidWeightUnit],
        ['isValidCountryCode', isValidCountryCode],
        ['isValidCurrencyCode', isValidCurrencyCode],
        ['isValidIssn', isValidIssn],
        ['string', isString],
        ['number', isNumber],
    ])

    const validationFunction = mapping.get(validationRule)

    if (!validationFunction) {
        throw new Error(`Unknown validation rule: ${validationRule}`)
    }

    return validationFunction(value)
}
