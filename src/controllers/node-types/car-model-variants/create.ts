import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateCarModelVariantInput} from "../../../models/node-types/car-model-variants/types/CreateCarModelVariantInput"
import {CarModelVariant} from "../../../models/node-types/car-model-variants/CarModelVariant"
import {convertCarModelVariantModelNodeToControllerNode} from "./convertCarModelVariantModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateCarModelVariantRawInput} from "./types/CreateCarModelVariantRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isOptionalString} from "../../validators/isOptionalString"
import {isOptionalNumber} from "../../validators/isOptionalNumber"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.CarModelVariant).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateCarModelVariantInput

    if (!validate(data)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await CarModelVariant.create(data)
        const node = convertCarModelVariantModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateCarModelVariantRawInput): boolean {
    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalString(data.internal_code)) {
        return false
    }

    if (!isOptionalNumber(data.built_from)) {
        return false
    }

    if (!isOptionalNumber(data.built_to)) {
        return false
    }

    if (!isOptionalString(data.body_style)) {
        return false
    }

    if (!isOptionalNumber(data.drag_coefficient)) {
        return false
    }

    if (!isOptionalNumber(data.doors)) {
        return false
    }

    if (!isOptionalNumber(data.weight)) {
        return false
    }

    if (!isOptionalString(data.weight_unit)) {
        return false
    }

    if (!isOptionalNumber(data.max_power)) {
        return false
    }

    if (!isOptionalString(data.max_power_unit)) {
        return false
    }

    if (!isOptionalNumber(data.max_torque)) {
        return false
    }

    if (!isOptionalString(data.max_torque_unit)) {
        return false
    }

    if (!isOptionalNumber(data.cylinders)) {
        return false
    }

    if (!isOptionalString(data.engine_configuration)) {
        return false
    }

    if (!isOptionalNumber(data.displacement)) {
        return false
    }

    if (!isOptionalString(data.displacement_unit)) {
        return false
    }

    if (!isOptionalString(data.air_induction)) {
        return false
    }

    if (!isOptionalString(data.engine_type)) {
        return false
    }

    if (!isOptionalString(data.energy_source)) {
        return false
    }

    if (!isOptionalString(data.energy_source_2)) {
        return false
    }

    if (!isOptionalNumber(data.consumption)) {
        return false
    }

    if (!isOptionalString(data.consumption_unit)) {
        return false
    }

    if (!isOptionalNumber(data.consumption_2)) {
        return false
    }

    if (!isOptionalString(data.consumption_2_unit)) {
        return false
    }

    if (!isOptionalNumber(data.energy_capacity)) {
        return false
    }

    if (!isOptionalString(data.energy_capacity_unit)) {
        return false
    }

    if (!isOptionalNumber(data.energy_capacity_2)) {
        return false
    }

    if (!isOptionalString(data.energy_capacity_2_unit)) {
        return false
    }

    if (!isOptionalString(data.transmission)) {
        return false
    }

    if (!isOptionalNumber(data.gears)) {
        return false
    }

    if (!isOptionalString(data.drivetrain)) {
        return false
    }

    if (!isOptionalNumber(data.sprint_time_0_100_kmh)) {
        return false
    }

    if (!isOptionalNumber(data.top_speed)) {
        return false
    }

    if (!isOptionalString(data.top_speed_unit)) {
        return false
    }

    if (!isOptionalNumber(data.total_production)) {
        return false
    }

    return true
}
