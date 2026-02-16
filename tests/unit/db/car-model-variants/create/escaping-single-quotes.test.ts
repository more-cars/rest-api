import {expect, test} from 'vitest'
import {InputCarModelVariantCreate} from "../../../../../src/db/nodes/car-model-variants/types/InputCarModelVariantCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputCarModelVariantCreate = {
        name: "'BMW M3",
        internal_code: "'E46",
        built_from: null,
        built_to: null,
        body_style: "'coupe",
        drag_coefficient: null,
        doors: null,
        weight: null,
        weight_unit: "'kg",
        max_power: null,
        max_power_unit: "'PS",
        max_torque: null,
        max_torque_unit: "'Nm",
        cylinders: null,
        engine_configuration: "'inline",
        displacement: null,
        displacement_unit: "'ccm",
        air_induction: "'naturally aspirated",
        engine_type: "'otto",
        energy_source: "'petrol",
        energy_source_2: "'",
        consumption: null,
        consumption_unit: "'l",
        consumption_2: null,
        consumption_2_unit: "'",
        energy_capacity: null,
        energy_capacity_unit: "'l",
        energy_capacity_2: null,
        energy_capacity_2_unit: "'",
        transmission: "'sequential",
        gears: null,
        drivetrain: "'rwd",
        sprint_time_0_100_kmh: null,
        top_speed: null,
        top_speed_unit: "'km/h",
        total_production: null
    }

    const query = createNodeQuery(NodeTypeLabel.CarModelVariant, data)

    expect(query)
        .toEqual(
            "CREATE (node:CarModelVariant {\n" +
            "  name: '\\'BMW M3',\n" +
            "  internal_code: '\\'E46',\n" +
            "  built_from: null,\n" +
            "  built_to: null,\n" +
            "  body_style: '\\'coupe',\n" +
            "  drag_coefficient: null,\n" +
            "  doors: null,\n" +
            "  weight: null,\n" +
            "  weight_unit: '\\'kg',\n" +
            "  max_power: null,\n" +
            "  max_power_unit: '\\'PS',\n" +
            "  max_torque: null,\n" +
            "  max_torque_unit: '\\'Nm',\n" +
            "  cylinders: null,\n" +
            "  engine_configuration: '\\'inline',\n" +
            "  displacement: null,\n" +
            "  displacement_unit: '\\'ccm',\n" +
            "  air_induction: '\\'naturally aspirated',\n" +
            "  engine_type: '\\'otto',\n" +
            "  energy_source: '\\'petrol',\n" +
            "  energy_source_2: '\\'',\n" +
            "  consumption: null,\n" +
            "  consumption_unit: '\\'l',\n" +
            "  consumption_2: null,\n" +
            "  consumption_2_unit: '\\'',\n" +
            "  energy_capacity: null,\n" +
            "  energy_capacity_unit: '\\'l',\n" +
            "  energy_capacity_2: null,\n" +
            "  energy_capacity_2_unit: '\\'',\n" +
            "  transmission: '\\'sequential',\n" +
            "  gears: null,\n" +
            "  drivetrain: '\\'rwd',\n" +
            "  sprint_time_0_100_kmh: null,\n" +
            "  top_speed: null,\n" +
            "  top_speed_unit: '\\'km/h',\n" +
            "  total_production: null\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
