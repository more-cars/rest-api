import {expect, test} from 'vitest'
import {InputCarModelVariantCreate} from "../../../../../src/db/nodes/car-model-variants/types/InputCarModelVariantCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a CAR MODEL VARIANT node', async () => {
    const data: InputCarModelVariantCreate = {
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
        energy_source_2: null,
        consumption: 11.9,
        consumption_unit: "l",
        consumption_2: null,
        consumption_2_unit: null,
        energy_capacity: 63,
        energy_capacity_unit: "l",
        energy_capacity_2: null,
        energy_capacity_2_unit: null,
        transmission: "sequential",
        gears: 6,
        drivetrain: "rwd",
        sprint_time_0_100_kmh: 5.2,
        top_speed: 250,
        top_speed_unit: "km/h",
        total_production: 50000
    }

    const query = createNodeQuery(DbNodeType.CarModelVariant, data)

    expect(query)
        .toEqual(
            "CREATE (node:CarModelVariant_" + appInstanceId + " {\n" +
            "  name: 'BMW M3',\n" +
            "  internal_code: 'E46',\n" +
            "  built_from: 2000,\n" +
            "  built_to: 2006,\n" +
            "  body_style: 'coupe',\n" +
            "  drag_coefficient: 0.31,\n" +
            "  doors: 2,\n" +
            "  weight: 1549,\n" +
            "  weight_unit: 'kg',\n" +
            "  max_power: 343,\n" +
            "  max_power_unit: 'PS',\n" +
            "  max_torque: 365,\n" +
            "  max_torque_unit: 'Nm',\n" +
            "  cylinders: 6,\n" +
            "  engine_configuration: 'inline',\n" +
            "  displacement: 3246,\n" +
            "  displacement_unit: 'ccm',\n" +
            "  air_induction: 'naturally aspirated',\n" +
            "  engine_type: 'otto',\n" +
            "  energy_source: 'petrol',\n" +
            "  energy_source_2: null,\n" +
            "  consumption: 11.9,\n" +
            "  consumption_unit: 'l',\n" +
            "  consumption_2: null,\n" +
            "  consumption_2_unit: null,\n" +
            "  energy_capacity: 63,\n" +
            "  energy_capacity_unit: 'l',\n" +
            "  energy_capacity_2: null,\n" +
            "  energy_capacity_2_unit: null,\n" +
            "  transmission: 'sequential',\n" +
            "  gears: 6,\n" +
            "  drivetrain: 'rwd',\n" +
            "  sprint_time_0_100_kmh: 5.2,\n" +
            "  top_speed: 250,\n" +
            "  top_speed_unit: 'km/h',\n" +
            "  total_production: 50000\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
