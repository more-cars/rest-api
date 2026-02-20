import {Node} from "neo4j-driver"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {DbNodeType} from "../../types/DbNodeType"

export function mapDbNodeToCarModelVariantNode(neo4jNode: Node): CarModelVariantNode {
    const node: CarModelVariantNode = {
        node_type: DbNodeType.CarModelVariant,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            name: neo4jNode.properties.name,
            internal_code: neo4jNode.properties.internal_code,
            built_from: neo4jNode.properties.built_from,
            built_to: neo4jNode.properties.built_to,
            body_style: neo4jNode.properties.body_style,
            drag_coefficient: neo4jNode.properties.drag_coefficient,
            doors: neo4jNode.properties.doors,
            weight: neo4jNode.properties.weight,
            weight_unit: neo4jNode.properties.weight_unit,
            max_power: neo4jNode.properties.max_power,
            max_power_unit: neo4jNode.properties.max_power_unit,
            max_torque: neo4jNode.properties.max_torque,
            max_torque_unit: neo4jNode.properties.max_torque_unit,
            cylinders: neo4jNode.properties.cylinders,
            engine_configuration: neo4jNode.properties.engine_configuration,
            displacement: neo4jNode.properties.displacement,
            displacement_unit: neo4jNode.properties.displacement_unit,
            air_induction: neo4jNode.properties.air_induction,
            engine_type: neo4jNode.properties.engine_type,
            energy_source: neo4jNode.properties.energy_source,
            energy_source_2: neo4jNode.properties.energy_source_2,
            consumption: neo4jNode.properties.consumption,
            consumption_unit: neo4jNode.properties.consumption_unit,
            consumption_2: neo4jNode.properties.consumption_2,
            consumption_2_unit: neo4jNode.properties.consumption_2_unit,
            energy_capacity: neo4jNode.properties.energy_capacity,
            energy_capacity_unit: neo4jNode.properties.energy_capacity_unit,
            energy_capacity_2: neo4jNode.properties.energy_capacity_2,
            energy_capacity_2_unit: neo4jNode.properties.energy_capacity_2_unit,
            transmission: neo4jNode.properties.transmission,
            gears: neo4jNode.properties.gears,
            drivetrain: neo4jNode.properties.drivetrain,
            sprint_time_0_100_kmh: neo4jNode.properties.sprint_time_0_100_kmh,
            top_speed: neo4jNode.properties.top_speed,
            top_speed_unit: neo4jNode.properties.top_speed_unit,
            total_production: neo4jNode.properties.total_production,
        }
    }

    return node
}
