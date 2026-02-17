import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/car-model-variants/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'BMW M3''",
        internal_code: "'E46''",
        built_from: 2000,
        built_to: 2006,
        body_style: "'coupe''",
        drag_coefficient: 0.31,
        doors: 2,
        weight: 1549,
        weight_unit: "'kg''",
        max_power: 343,
        max_power_unit: "'PS''",
        max_torque: 365,
        max_torque_unit: "'Nm''",
        cylinders: 6,
        engine_configuration: "'inline''",
        displacement: 3246,
        displacement_unit: "'ccm''",
        air_induction: "'naturally aspirated''",
        engine_type: "'otto''",
        energy_source: "'petrol''",
        energy_source_2: null,
        consumption: 11.9,
        consumption_unit: "'l''",
        consumption_2: null,
        consumption_2_unit: null,
        energy_capacity: 63,
        energy_capacity_unit: "'l''",
        energy_capacity_2: null,
        energy_capacity_2_unit: null,
        transmission: "'sequential''",
        gears: 6,
        drivetrain: "'rwd''",
        sprint_time_0_100_kmh: 5.2,
        top_speed: 250,
        top_speed_unit: "'km/h''",
        total_production: 50000,
    }

    const createdNode = await createNode(data)

    expect(createdNode.name)
        .toEqual("'BMW M3''")

    expect(createdNode.internal_code)
        .toEqual("'E46''")

    expect(createdNode.body_style)
        .toEqual("'coupe''")

    expect(createdNode.weight_unit)
        .toEqual("'kg''")

    expect(createdNode.max_power_unit)
        .toEqual("'PS''")

    expect(createdNode.max_torque_unit)
        .toEqual("'Nm''")

    expect(createdNode.engine_configuration)
        .toEqual("'inline''")

    expect(createdNode.displacement_unit)
        .toEqual("'ccm''")

    expect(createdNode.air_induction)
        .toEqual("'naturally aspirated''")

    expect(createdNode.engine_type)
        .toEqual("'otto''")

    expect(createdNode.energy_source)
        .toEqual("'petrol''")

    expect(createdNode.consumption_unit)
        .toEqual("'l''")

    expect(createdNode.energy_capacity_unit)
        .toEqual("'l''")

    expect(createdNode.transmission)
        .toEqual("'sequential''")

    expect(createdNode.drivetrain)
        .toEqual("'rwd''")

    expect(createdNode.top_speed_unit)
        .toEqual("'km/h''")
})
