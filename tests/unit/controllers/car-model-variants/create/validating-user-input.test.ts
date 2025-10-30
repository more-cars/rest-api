import {describe, expect, test} from 'vitest'
import {
    CreateCarModelVariantRawInput
} from "../../../../../src/controllers/car-model-variants/types/CreateCarModelVariantRawInput"
import {validate} from "../../../../../src/controllers/car-model-variants/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
        const data: CreateCarModelVariantRawInput = {
            name: undefined,
            internal_code: "E46",
            built_from: 2000,
            built_to: 2006,
            body_style: "coupe",
            drag_coefficient: 0.31,
            doors: 2,
            weight: 1549,
            weight_unit: "kg",
            max_power: 343,
            max_power_unit: "PS",
            max_torque: 365,
            max_torque_unit: "Nm",
            cylinders: 6,
            engine_configuration: "inline",
            displacement: 3246,
            displacement_unit: "ccm",
            air_induction: "naturally aspirated",
            engine_type: "otto",
            energy_source: "petrol",
            energy_source_2: "",
            consumption: 11.9,
            consumption_unit: "l",
            consumption_2: null,
            consumption_2_unit: "",
            energy_capacity: 63,
            energy_capacity_unit: "l",
            energy_capacity_2: null,
            energy_capacity_2_unit: "",
            transmission: "sequential",
            gears: 6,
            drivetrain: "rwd",
            sprint_time_0_100_kmh: 5.2,
            top_speed: 250,
            top_speed_unit: "km/h",
            total_production: 50000,
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })

    test('optional fields are missing', async () => {
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

    test('providing valid input', async () => {
        const data: CreateCarModelVariantRawInput = {
            name: "BMW M3",
            internal_code: "E46",
            built_from: 2000,
            built_to: 2006,
            body_style: "coupe",
            drag_coefficient: 0.31,
            doors: 2,
            weight: 1549,
            weight_unit: "kg",
            max_power: 343,
            max_power_unit: "PS",
            max_torque: 365,
            max_torque_unit: "Nm",
            cylinders: 6,
            engine_configuration: "inline",
            displacement: 3246,
            displacement_unit: "ccm",
            air_induction: "naturally aspirated",
            engine_type: "otto",
            energy_source: "petrol",
            energy_source_2: "",
            consumption: 11.9,
            consumption_unit: "l",
            consumption_2: null,
            consumption_2_unit: "",
            energy_capacity: 63,
            energy_capacity_unit: "l",
            energy_capacity_2: null,
            energy_capacity_2_unit: "",
            transmission: "sequential",
            gears: 6,
            drivetrain: "rwd",
            sprint_time_0_100_kmh: 5.2,
            top_speed: 250,
            top_speed_unit: "km/h",
            total_production: 50000,
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })
})
