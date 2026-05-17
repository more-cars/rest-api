import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapProgrammeEpisode(oldNode: Node): DbInputData {
    return {
        title: oldNode.properties.name,
        season_number: oldNode.properties.season,
        season_episode_number: oldNode.properties.season_episode,
        original_air_date: oldNode.properties.air_date,
        duration: oldNode.properties.duration,
    }
}
