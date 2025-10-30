export const CarModelVariantSchema = {
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {
            type: [
                "string",
            ]
        },
        internal_code: {
            type: [
                "string",
                "null",
            ]
        },
        built_from: {
            type: [
                "number",
                "null",
            ]
        },
        built_to: {
            type: [
                "number",
                "null",
            ]
        },
        body_style: {
            type: [
                "string",
                "null",
            ]
        },
        drag_coefficient: {
            type: [
                "number",
                "null",
            ]
        },
        doors: {
            type: [
                "number",
                "null",
            ]
        },
        weight: {
            type: [
                "number",
                "null",
            ]
        },
        weight_unit: {
            type: [
                "string",
                "null",
            ]
        },
        max_power: {
            type: [
                "number",
                "null",
            ]
        },
        max_power_unit: {
            type: [
                "string",
                "null",
            ]
        },
        max_torque: {
            type: [
                "number",
                "null",
            ]
        },
        max_torque_unit: {
            type: [
                "string",
                "null",
            ]
        },
        cylinders: {
            type: [
                "number",
                "null",
            ]
        },
        engine_configuration: {
            type: [
                "string",
                "null",
            ]
        },
        displacement: {
            type: [
                "number",
                "null",
            ]
        },
        displacement_unit: {
            type: [
                "string",
                "null",
            ]
        },
        air_induction: {
            type: [
                "string",
                "null",
            ]
        },
        engine_type: {
            type: [
                "string",
                "null",
            ]
        },
        energy_source: {
            type: [
                "string",
                "null",
            ]
        },
        energy_source_2: {
            type: [
                "string",
                "null",
            ]
        },
        consumption: {
            type: [
                "number",
                "null",
            ]
        },
        consumption_unit: {
            type: [
                "string",
                "null",
            ]
        },
        consumption_2: {
            type: [
                "number",
                "null",
            ]
        },
        consumption_2_unit: {
            type: [
                "string",
                "null",
            ]
        },
        energy_capacity: {
            type: [
                "number",
                "null",
            ]
        },
        energy_capacity_unit: {
            type: [
                "string",
                "null",
            ]
        },
        energy_capacity_2: {
            type: [
                "number",
                "null",
            ]
        },
        energy_capacity_2_unit: {
            type: [
                "string",
                "null",
            ]
        },
        transmission: {
            type: [
                "string",
                "null",
            ]
        },
        gears: {
            type: [
                "number",
                "null",
            ]
        },
        drivetrain: {
            type: [
                "string",
                "null",
            ]
        },
        sprint_time_0_100_kmh: {
            type: [
                "number",
                "null",
            ]
        },
        top_speed: {
            type: [
                "number",
                "null",
            ]
        },
        top_speed_unit: {
            type: [
                "string",
                "null",
            ]
        },
        total_production: {
            type: [
                "number",
                "null",
            ]
        },
        created_at: {type: "string"},
        updated_at: {type: "string"},
    },
    required: [
        "id",
        "name",
        "created_at",
        "updated_at",
    ],
    additionalProperties: false,
}
