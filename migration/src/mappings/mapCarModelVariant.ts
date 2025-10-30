import {Node} from "neo4j-driver"
import type {
    InputCarModelVariantCreate
} from "../../../src/db/nodes/car-model-variants/types/InputCarModelVariantCreate"

export function mapCarModelVariant(oldNode: Node): InputCarModelVariantCreate {
    return {
        name: oldNode.properties.name,
        internal_code: oldNode.properties.internal_code,
        built_from: oldNode.properties.built_from,
        built_to: oldNode.properties.built_to,
        body_style: oldNode.properties.body_style,
        drag_coefficient: oldNode.properties.cw,
        doors: oldNode.properties.doors,
        weight: oldNode.properties.weight,
        weight_unit: oldNode.properties.weight_unit,
        max_power: oldNode.properties.max_power,
        max_power_unit: oldNode.properties.max_power_unit,
        max_torque: oldNode.properties.max_torque,
        max_torque_unit: oldNode.properties.max_torque_unit,
        cylinders: oldNode.properties.cylinders,
        engine_configuration: oldNode.properties.engine_configuration,
        displacement: oldNode.properties.displacement,
        displacement_unit: oldNode.properties.displacement_unit,
        air_induction: oldNode.properties.charger,
        engine_type: oldNode.properties.engine_type,
        energy_source: oldNode.properties.energy_source,
        energy_source_2: oldNode.properties.energy_source_2,
        consumption: oldNode.properties.fuel_consumption,
        consumption_unit: oldNode.properties.fuel_consumption_unit,
        consumption_2: oldNode.properties.fuel_consumption_2,
        consumption_2_unit: oldNode.properties.fuel_consumption_2_unit,
        energy_capacity: oldNode.properties.energy_capacity,
        energy_capacity_unit: oldNode.properties.energy_capacity_unit,
        energy_capacity_2: oldNode.properties.energy_capacity_2,
        energy_capacity_2_unit: oldNode.properties.energy_capacity_2_unit,
        transmission: oldNode.properties.transmission,
        gears: oldNode.properties.gears,
        drivetrain: oldNode.properties.drivetrain,
        sprint_time_0_100_kmh: oldNode.properties.sprint_0_100,
        top_speed: oldNode.properties.topspeed,
        top_speed_unit: oldNode.properties.topspeed_unit,
        total_production: oldNode.properties.total_production,
    }
}