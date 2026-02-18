import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {marshalNode} from "./marshalling/marshalNode"
import {CreateCarModelVariantInput} from "../../../models/node-types/car-model-variants/types/CreateCarModelVariantInput"
import {CarModelVariant} from "../../../models/node-types/car-model-variants/CarModelVariant"
import type {CreateCarModelVariantRawInput} from "./types/CreateCarModelVariantRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isOptionalString} from "../../validators/isOptionalString"
import {isOptionalNumber} from "../../validators/isOptionalNumber"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshalInputData(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateCarModelVariantInput)

    try {
        const createdNode = await CarModelVariant.create(sanitizedData)
        const marshalledData = marshalNode(createdNode)

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

export function sanitize(data: CreateCarModelVariantInput): CreateCarModelVariantInput {
    return {
        name: data.name.trim(),
        internal_code: data.internal_code ? data.internal_code.trim() : null,
        built_from: data.built_from ? data.built_from : null,
        built_to: data.built_to ? data.built_to : null,
        body_style: data.body_style ? data.body_style.trim() : null,
        drag_coefficient: data.drag_coefficient ? data.drag_coefficient : null,
        doors: data.doors ? data.doors : null,
        weight: data.weight ? data.weight : null,
        weight_unit: data.weight_unit ? data.weight_unit.trim() : null,
        max_power: data.max_power ? data.max_power : null,
        max_power_unit: data.max_power_unit ? data.max_power_unit.trim() : null,
        max_torque: data.max_torque ? data.max_torque : null,
        max_torque_unit: data.max_torque_unit ? data.max_torque_unit.trim() : null,
        cylinders: data.cylinders ? data.cylinders : null,
        engine_configuration: data.engine_configuration ? data.engine_configuration.trim() : null,
        displacement: data.displacement ? data.displacement : null,
        displacement_unit: data.displacement_unit ? data.displacement_unit.trim() : null,
        air_induction: data.air_induction ? data.air_induction.trim() : null,
        engine_type: data.engine_type ? data.engine_type.trim() : null,
        energy_source: data.energy_source ? data.energy_source.trim() : null,
        energy_source_2: data.energy_source_2 ? data.energy_source_2.trim() : null,
        consumption: data.consumption ? data.consumption : null,
        consumption_unit: data.consumption_unit ? data.consumption_unit.trim() : null,
        consumption_2: data.consumption_2 ? data.consumption_2 : null,
        consumption_2_unit: data.consumption_2_unit ? data.consumption_2_unit.trim() : null,
        energy_capacity: data.energy_capacity ? data.energy_capacity : null,
        energy_capacity_unit: data.energy_capacity_unit ? data.energy_capacity_unit.trim() : null,
        energy_capacity_2: data.energy_capacity_2 ? data.energy_capacity_2 : null,
        energy_capacity_2_unit: data.energy_capacity_2_unit ? data.energy_capacity_2_unit.trim() : null,
        transmission: data.transmission ? data.transmission.trim() : null,
        gears: data.gears ? data.gears : null,
        drivetrain: data.drivetrain ? data.drivetrain.trim() : null,
        sprint_time_0_100_kmh: data.sprint_time_0_100_kmh ? data.sprint_time_0_100_kmh : null,
        top_speed: data.top_speed ? data.top_speed : null,
        top_speed_unit: data.top_speed_unit ? data.top_speed_unit.trim() : null,
        total_production: data.total_production ? data.total_production : null,
    } as CreateCarModelVariantInput
}
