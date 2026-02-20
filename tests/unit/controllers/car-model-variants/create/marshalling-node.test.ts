import {expect, test} from 'vitest'
import {CarModelVariantNode} from "../../../../../src/models/node-types/car-model-variants/types/CarModelVariantNode"
import {marshalNode} from "../../../../../src/controllers/node-types/car-model-variants/marshalling/marshalNode"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"

test("marshalling a CAR MODEL VARIANT node", async () => {
    const node: CarModelVariantNode = {
        node_type: ModelNodeType.CarModelVariant,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
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
            total_production: 50000,
        }
    }

    const marshalledNode = marshalNode(node)

    expect(marshalledNode)
        .toStrictEqual({
            data: {
                id: 1,
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
                total_production: 50000,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
