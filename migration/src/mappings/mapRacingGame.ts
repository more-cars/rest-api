import {Node} from "neo4j-driver"
import {InputRacingGameCreate} from "../../../src/db/node-types/racing-games/types/InputRacingGameCreate"

export function mapRacingGame(oldNode: Node): InputRacingGameCreate {
    return {
        name: oldNode.properties.name,
        release_year: oldNode.properties.release_year,
        developer: oldNode.properties.developer,
        publisher: oldNode.properties.publisher,
    }
}
