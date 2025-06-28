import {InputCarModelCreate} from "./types/InputCarModelCreate"
import {CarModelNode} from "./types/CarModelNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {createDbNode} from "../createDbNode.ts"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputCarModelCreate): Promise<CarModelNode> {
    const node = await createDbNode(NodeTypeLabel.CarModel, createNodeQuery(data))

    return mapDbNodeToModelNode(node)
}

export function createNodeQuery(data: InputCarModelCreate) {
    let template = getCypherQueryTemplate('nodes/car-models/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$name', `'${escapeSingleQuotes(data.name)}'`)
        .replace('$built_from', data.built_from ? `${data.built_from}` : 'null')
        .replace('$built_to', data.built_to ? `${data.built_to}` : 'null')
        .replace('$generation', data.generation ? `${data.generation}` : 'null')
        .replace('$internal_code', data.internal_code ? `'${escapeSingleQuotes(data.internal_code)}'` : 'null')
        .replace('$total_production', data.total_production ? `${data.total_production}` : 'null')

    return template
}
