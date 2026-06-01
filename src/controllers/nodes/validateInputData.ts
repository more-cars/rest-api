import type {RawInputData} from "../types/RawInputData"
import type {NodeType} from "../../specification/NodeType"
import {getNodeTypeSpecification} from "../../specification/getNodeTypeSpecification"
import type {ValidationRule} from "../../specification/ValidationRule"
import {isMandatory} from "../validators/isMandatory"
import {isString} from "../validators/isString"
import {isNumber} from "../validators/isNumber"
import {isValidImageProvider} from "../validators/isValidImageProvider"
import {isValidVideoProvider} from "../validators/isValidVideoProvider"
import {isValidCountryCode} from "../validators/isValidCountryCode"
import {isValidCurrencyCode} from "../validators/isValidCurrencyCode"
import {isValidIssn} from "../validators/isValidIssn"
import {isValidWeightUnit} from "../validators/isValidWeightUnit"
import {isValidWeightNorm} from "../validators/isValidWeightNorm"
import {isValidPowerUnit} from "../validators/isValidPowerUnit"
import {isValidPowerNorm} from "../validators/isValidPowerNorm"
import {isValidAirInduction} from "../validators/isValidAirInduction"
import {isValidBodyStyle} from "../validators/isValidBodyStyle"
import {isValidCapacityUnit} from "../validators/isValidCapacityUnit"
import {isValidConsumptionUnit} from "../validators/isValidConsumptionUnit"
import {isValidConsumptionNorm} from "../validators/isValidConsumptionNorm"
import {isValidDisplacementUnit} from "../validators/isValidDisplacementUnit"
import {isValidDrivetrain} from "../validators/isValidDrivetrain"
import {isValidEnergySource} from "../validators/isValidEnergySource"
import {isValidEngineConfiguration} from "../validators/isValidEngineConfiguration"
import {isValidEngineType} from "../validators/isValidEngineType"
import {isValidSpeedUnit} from "../validators/isValidSpeedUnit"
import {isValidTorqueUnit} from "../validators/isValidTorqueUnit"
import {isValidTransmission} from "../validators/isValidTransmission"
import {isValidDuration} from "../validators/isValidDuration"
import {isValidDate} from "../validators/isValidDate"
import {isValidTime} from "../validators/isValidTime"
import {isValidMagazineFocus} from "../validators/isValidMagazineFocus"
import {isValidPublicationFormat} from "../validators/isValidPublicationFormat"
import {isValidPublicationFrequency} from "../validators/isValidPublicationFrequency"
import {isValidModelScale} from "../validators/isValidModelScale"
import {isValidTargetAudience} from "../validators/isValidTargetAudience"
import {isValidMotorShowFocus} from "../validators/isValidMotorShowFocus"
import {isValidTrackType} from "../validators/isValidTrackType"
import {isValidVehicleType} from "../validators/isValidVehicleType"
import {isValidScaleDirection} from "../validators/isValidScaleDirection"
import {isValidSessionResultStatus} from "../validators/isValidSessionResultStatus"
import {isValidLengthUnit} from "../validators/isValidLengthUnit"
import {isValidTrackDirection} from "../validators/isValidTrackDirection"
import {isValidTrackSurface} from "../validators/isValidTrackSurface"
import {isValidGeoPosition} from "../validators/isValidGeoPosition"
import {isValidDateTime} from "../validators/isValidDateTime"
import {isValidLanguageCode} from "../validators/isValidLanguageCode"
import {isValidIsbn} from "../validators/isValidIsbn"

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
                isValid = false
            }
        })
    })

    return isValid
}

function validate(value: unknown, validationRule: ValidationRule) {
    const mapping = new Map<ValidationRule, (value: unknown) => boolean>([
        ['mandatory', isMandatory],
        ['string', isString],
        ['number', isNumber],
        ['imageProvider', isValidImageProvider],
        ['videoProvider', isValidVideoProvider],
        ['airInduction', isValidAirInduction],
        ['bodyStyle', isValidBodyStyle],
        ['capacityUnit', isValidCapacityUnit],
        ['consumptionUnit', isValidConsumptionUnit],
        ['consumptionNorm', isValidConsumptionNorm],
        ['displacementUnit', isValidDisplacementUnit],
        ['drivetrain', isValidDrivetrain],
        ['energySource', isValidEnergySource],
        ['engineConfiguration', isValidEngineConfiguration],
        ['engineType', isValidEngineType],
        ['powerUnit', isValidPowerUnit],
        ['powerNorm', isValidPowerNorm],
        ['speedUnit', isValidSpeedUnit],
        ['torqueUnit', isValidTorqueUnit],
        ['transmission', isValidTransmission],
        ['weightUnit', isValidWeightUnit],
        ['weightNorm', isValidWeightNorm],
        ['countryCode', isValidCountryCode],
        ['currencyCode', isValidCurrencyCode],
        ['issn', isValidIssn],
        ['duration', isValidDuration],
        ['date', isValidDate],
        ['time', isValidTime],
        ['magazineFocus', isValidMagazineFocus],
        ['publicationFormat', isValidPublicationFormat],
        ['publicationFrequency', isValidPublicationFrequency],
        ['modelScale', isValidModelScale],
        ['targetAudience', isValidTargetAudience],
        ['motorShowFocus', isValidMotorShowFocus],
        ['trackType', isValidTrackType],
        ['vehicleType', isValidVehicleType],
        ['scaleDirection', isValidScaleDirection],
        ['sessionResultStatus', isValidSessionResultStatus],
        ['lengthUnit', isValidLengthUnit],
        ['trackDirection', isValidTrackDirection],
        ['trackSurface', isValidTrackSurface],
        ['geoPosition', isValidGeoPosition],
        ['dateTime', isValidDateTime],
        ['languageCode', isValidLanguageCode],
        ['isbn', isValidIsbn],
    ])

    const validationFunction = mapping.get(validationRule)

    if (!validationFunction) {
        throw new Error(`Unknown validation rule: ${validationRule}`)
    }

    return validationFunction(value)
}
