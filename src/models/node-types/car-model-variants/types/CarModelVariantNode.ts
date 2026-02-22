import type {ModelNodeType} from "../../../types/ModelNodeType"

export type CarModelVariantNode = {
    node_type: ModelNodeType.CarModelVariant,
    attributes: {
        id: number

        name: string
        internal_code: string | null
        built_from: number | null
        built_to: number | null
        body_style: string | null
        drag_coefficient: number | null
        doors: number | null
        weight: number | null
        weight_unit: string | null
        max_power: number | null
        max_power_unit: string | null
        max_torque: number | null
        max_torque_unit: string | null
        cylinders: number | null
        engine_configuration: string | null
        displacement: number | null
        displacement_unit: string | null
        air_induction: string | null
        engine_type: string | null
        energy_source: string | null
        energy_source_2: string | null
        consumption: number | null
        consumption_unit: string | null
        consumption_2: number | null
        consumption_2_unit: string | null
        energy_capacity: number | null
        energy_capacity_unit: string | null
        energy_capacity_2: number | null
        energy_capacity_2_unit: string | null
        transmission: string | null
        gears: number | null
        drivetrain: string | null
        sprint_time_0_100_kmh: number | null
        top_speed: number | null
        top_speed_unit: string | null
        total_production: number | null

        created_at: string
        updated_at: string
    }
}
