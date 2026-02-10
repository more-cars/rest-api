import {InputRacingGameCreate} from "./types/InputRacingGameCreate"
import {RacingGameNode} from "./types/RacingGameNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingGameNode} from "./mapDbNodeToRacingGameNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputRacingGameCreate): Promise<RacingGameNode> {
    const node = await createDbNode(NodeTypeLabel.RacingGame, createNodeQuery(data))

    return mapDbNodeToRacingGameNode(node)
}

export function createNodeQuery(data: InputRacingGameCreate) {
    let template = getCypherQueryTemplate('nodes/racing-games/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$name', `'${escapeSingleQuotes(data.name)}'`)
        .replace('$release_year', data.release_year ? `${data.release_year}` : 'null')
        .replace('$developer', data.developer ? `'${escapeSingleQuotes(data.developer)}'` : 'null')
        .replace('$publisher', data.publisher ? `'${escapeSingleQuotes(data.publisher)}'` : 'null')
    return template
}
