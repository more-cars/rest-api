import {Node} from "neo4j-driver"
import {CarModelVariantNode} from "./types/CarModelVariantNode"

export function mapDbNodeToCarModelVariantNode(dbNode: Node): CarModelVariantNode {
    return {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        name: dbNode.properties.name,
        internal_code: dbNode.properties.internal_code,
        built_from: dbNode.properties.built_from,
        built_to: dbNode.properties.built_to,
        body_style: dbNode.properties.body_style,
        drag_coefficient: dbNode.properties.drag_coefficient,
        doors: dbNode.properties.doors,
        weight: dbNode.properties.weight,
        weight_unit: dbNode.properties.weight_unit,
        max_power: dbNode.properties.max_power,
        max_power_unit: dbNode.properties.max_power_unit,
        max_torque: dbNode.properties.max_torque,
        max_torque_unit: dbNode.properties.max_torque_unit,
        cylinders: dbNode.properties.cylinders,
        engine_configuration: dbNode.properties.engine_configuration,
        displacement: dbNode.properties.displacement,
        displacement_unit: dbNode.properties.displacement_unit,
        air_induction: dbNode.properties.air_induction,
        engine_type: dbNode.properties.engine_type,
        energy_source: dbNode.properties.energy_source,
        energy_source_2: dbNode.properties.energy_source_2,
        consumption: dbNode.properties.consumption,
        consumption_unit: dbNode.properties.consumption_unit,
        consumption_2: dbNode.properties.consumption_2,
        consumption_2_unit: dbNode.properties.consumption_2_unit,
        energy_capacity: dbNode.properties.energy_capacity,
        energy_capacity_unit: dbNode.properties.energy_capacity_unit,
        energy_capacity_2: dbNode.properties.energy_capacity_2,
        energy_capacity_2_unit: dbNode.properties.energy_capacity_2_unit,
        transmission: dbNode.properties.transmission,
        gears: dbNode.properties.gears,
        drivetrain: dbNode.properties.drivetrain,
        sprint_time_0_100_kmh: dbNode.properties.sprint_time_0_100_kmh,
        top_speed: dbNode.properties.top_speed,
        top_speed_unit: dbNode.properties.top_speed_unit,
        total_production: dbNode.properties.total_production,
    } as CarModelVariantNode
}
