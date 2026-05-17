import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapProgramme(oldNode: Node): DbInputData {
    return {
        name: oldNode.properties.name,
        aired_from_year: oldNode.properties.aired_from,
        aired_until_year: oldNode.properties.aired_to,
        channel: oldNode.properties.station,
        total_seasons: oldNode.properties.seasons,
        total_episodes: oldNode.properties.episodes,
        regular_episode_running_time: oldNode.properties.running_time,
        country_code: null,
    }
}
