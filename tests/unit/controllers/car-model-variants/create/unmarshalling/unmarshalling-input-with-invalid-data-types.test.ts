import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/car-model-variants/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Incorrect data types will be accepted, as long as the "keys" are correct.
 */
test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        name: true,
        internal_code: true,
        built_from: true,
        built_to: true,
        body_style: true,
        drag_coefficient: true,
        doors: true,
        weight: true,
        weight_unit: true,
        max_power: true,
        max_power_unit: true,
        max_torque: true,
        max_torque_unit: true,
        cylinders: true,
        engine_configuration: true,
        displacement: true,
        displacement_unit: true,
        air_induction: true,
        engine_type: true,
        energy_source: true,
        energy_source_2: true,
        consumption: true,
        consumption_unit: true,
        consumption_2: true,
        consumption_2_unit: true,
        energy_capacity: true,
        energy_capacity_unit: true,
        energy_capacity_2: true,
        energy_capacity_2_unit: true,
        transmission: true,
        gears: true,
        drivetrain: true,
        sprint_time_0_100_kmh: true,
        top_speed: true,
        top_speed_unit: true,
        total_production: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: true,
            internal_code: true,
            built_from: true,
            built_to: true,
            body_style: true,
            drag_coefficient: true,
            doors: true,
            weight: true,
            weight_unit: true,
            max_power: true,
            max_power_unit: true,
            max_torque: true,
            max_torque_unit: true,
            cylinders: true,
            engine_configuration: true,
            displacement: true,
            displacement_unit: true,
            air_induction: true,
            engine_type: true,
            energy_source: true,
            energy_source_2: true,
            consumption: true,
            consumption_unit: true,
            consumption_2: true,
            consumption_2_unit: true,
            energy_capacity: true,
            energy_capacity_unit: true,
            energy_capacity_2: true,
            energy_capacity_2_unit: true,
            transmission: true,
            gears: true,
            drivetrain: true,
            sprint_time_0_100_kmh: true,
            top_speed: true,
            top_speed_unit: true,
            total_production: true,
        })
})
