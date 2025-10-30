import {InputCarModelVariantCreate} from "./types/InputCarModelVariantCreate"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCarModelVariantNode} from "./mapDbNodeToCarModelVariantNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputCarModelVariantCreate): Promise<CarModelVariantNode> {
    const node = await createDbNode(NodeTypeLabel.CarModelVariant, createNodeQuery(data))

    return mapDbNodeToCarModelVariantNode(node)
}

export function createNodeQuery(data: InputCarModelVariantCreate) {
    let template = getCypherQueryTemplate('nodes/car-model-variants/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$name', `'${escapeSingleQuotes(data.name)}'`)
        .replace('$internal_code', data.internal_code ? `'${escapeSingleQuotes(data.internal_code)}'` : 'null')
        .replace('$built_from', data.built_from ? `${data.built_from}` : 'null')
        .replace('$built_to', data.built_to ? `${data.built_to}` : 'null')
        .replace('$body_style', data.body_style ? `'${escapeSingleQuotes(data.body_style)}'` : 'null')
        .replace('$drag_coefficient', data.drag_coefficient ? `${data.drag_coefficient}` : 'null')
        .replace('$doors', data.doors ? `${data.doors}` : 'null')
        .replace('$weight', data.weight ? `${data.weight}` : 'null')
        .replace('$weight_unit', data.weight_unit ? `'${escapeSingleQuotes(data.weight_unit)}'` : 'null')
        .replace('$max_power', data.max_power ? `${data.max_power}` : 'null')
        .replace('$max_power_unit', data.max_power_unit ? `'${escapeSingleQuotes(data.max_power_unit)}'` : 'null')
        .replace('$max_torque', data.max_torque ? `${data.max_torque}` : 'null')
        .replace('$max_torque_unit', data.max_torque_unit ? `'${escapeSingleQuotes(data.max_torque_unit)}'` : 'null')
        .replace('$cylinders', data.cylinders ? `${data.cylinders}` : 'null')
        .replace('$engine_configuration', data.engine_configuration ? `'${escapeSingleQuotes(data.engine_configuration)}'` : 'null')
        .replace('$displacement', data.displacement ? `${data.displacement}` : 'null')
        .replace('$displacement_unit', data.displacement_unit ? `'${escapeSingleQuotes(data.displacement_unit)}'` : 'null')
        .replace('$air_induction', data.air_induction ? `'${escapeSingleQuotes(data.air_induction)}'` : 'null')
        .replace('$engine_type', data.engine_type ? `'${escapeSingleQuotes(data.engine_type)}'` : 'null')
        .replace('$energy_source', data.energy_source ? `'${escapeSingleQuotes(data.energy_source)}'` : 'null')
        .replace('$energy_source_2', data.energy_source_2 ? `'${escapeSingleQuotes(data.energy_source_2)}'` : 'null')
        .replace('$consumption', data.consumption ? `${data.consumption}` : 'null')
        .replace('$consumption_unit', data.consumption_unit ? `'${escapeSingleQuotes(data.consumption_unit)}'` : 'null')
        .replace('$consumption_2', data.consumption_2 ? `${data.consumption_2}` : 'null')
        .replace('$consumption_2_unit', data.consumption_2_unit ? `'${escapeSingleQuotes(data.consumption_2_unit)}'` : 'null')
        .replace('$energy_capacity', data.energy_capacity ? `${data.energy_capacity}` : 'null')
        .replace('$energy_capacity_unit', data.energy_capacity_unit ? `'${escapeSingleQuotes(data.energy_capacity_unit)}'` : 'null')
        .replace('$energy_capacity_2', data.energy_capacity_2 ? `${data.energy_capacity_2}` : 'null')
        .replace('$energy_capacity_2_unit', data.energy_capacity_2_unit ? `'${escapeSingleQuotes(data.energy_capacity_2_unit)}'` : 'null')
        .replace('$transmission', data.transmission ? `'${escapeSingleQuotes(data.transmission)}'` : 'null')
        .replace('$gears', data.gears ? `${data.gears}` : 'null')
        .replace('$drivetrain', data.drivetrain ? `'${escapeSingleQuotes(data.drivetrain)}'` : 'null')
        .replace('$sprint_time_0_100_kmh', data.sprint_time_0_100_kmh ? `${data.sprint_time_0_100_kmh}` : 'null')
        .replace('$top_speed', data.top_speed ? `${data.top_speed}` : 'null')
        .replace('$top_speed_unit', data.top_speed_unit ? `'${escapeSingleQuotes(data.top_speed_unit)}'` : 'null')
        .replace('$total_production', data.total_production ? `${data.total_production}` : 'null')
    return template
}
