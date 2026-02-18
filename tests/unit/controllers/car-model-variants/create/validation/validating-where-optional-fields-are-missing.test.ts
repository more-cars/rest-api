import {expect, test} from 'vitest'
import {CreateCarModelVariantRawInput} from "../../../../../../src/controllers/node-types/car-model-variants/types/CreateCarModelVariantRawInput"
import {validate} from "../../../../../../src/controllers/node-types/car-model-variants/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateCarModelVariantRawInput = {
        name: "BMW M3",
        internal_code: undefined,
        built_from: undefined,
        built_to: undefined,
        body_style: undefined,
        drag_coefficient: undefined,
        doors: undefined,
        weight: undefined,
        weight_unit: undefined,
        max_power: undefined,
        max_power_unit: undefined,
        max_torque: undefined,
        max_torque_unit: undefined,
        cylinders: undefined,
        engine_configuration: undefined,
        displacement: undefined,
        displacement_unit: undefined,
        air_induction: undefined,
        engine_type: undefined,
        energy_source: undefined,
        energy_source_2: undefined,
        consumption: undefined,
        consumption_unit: undefined,
        consumption_2: undefined,
        consumption_2_unit: undefined,
        energy_capacity: undefined,
        energy_capacity_unit: undefined,
        energy_capacity_2: undefined,
        energy_capacity_2_unit: undefined,
        transmission: undefined,
        gears: undefined,
        drivetrain: undefined,
        sprint_time_0_100_kmh: undefined,
        top_speed: undefined,
        top_speed_unit: undefined,
        total_production: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
