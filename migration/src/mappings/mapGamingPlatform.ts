import {Node} from "neo4j-driver"
import {InputGamingPlatformCreate} from "../../../src/db/node-types/gaming-platforms/types/InputGamingPlatformCreate"

export function mapGamingPlatform(oldNode: Node): InputGamingPlatformCreate {
    return {
        name: oldNode.properties.name,
        release_year: oldNode.properties.release_year,
        manufacturer: oldNode.properties.company,
    }
}
