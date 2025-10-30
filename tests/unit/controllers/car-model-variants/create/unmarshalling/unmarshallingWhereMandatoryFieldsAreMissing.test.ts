import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/car-model-variants/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Missing mandatory fields are automatically added as "undefined".
 */
test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {}
    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
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
        })
})
