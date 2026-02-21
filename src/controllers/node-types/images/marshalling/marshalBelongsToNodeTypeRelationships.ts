import type {ImageBelongsToNodeTypeRelationships} from "../../../../models/node-types/images/types/ImageBelongsToNodeTypeRelationships"
import type {ImageBelongsToNodeTypeResponse} from "../types/ImageBelongsToNodeTypeResponse"
import {marshalRelation} from "../../../relations/marshalRelation"
import {ControllerNodeType} from "../../../nodes/types/ControllerNodeType"

export function marshalBelongsToNodeTypeRelationships(relationships: ImageBelongsToNodeTypeRelationships) {
    // TODO this solution is not scalable
    const marshalledData: ImageBelongsToNodeTypeResponse = {
        data: {
            companies: {data: []},
            brands: {data: []},
            car_models: {data: []},
            race_tracks: {data: []},
            track_layouts: {data: []},
            racing_series: {data: []},
            racing_events: {data: []},
        }
    }

    relationships.companies.forEach((relationship) => {
        marshalledData.data.companies.data.push(marshalRelation(relationship, ControllerNodeType.Company))
    })

    relationships.brands.forEach((relationship) => {
        marshalledData.data.brands.data.push(marshalRelation(relationship, ControllerNodeType.Brand))
    })

    relationships.car_models.forEach((relationship) => {
        marshalledData.data.car_models.data.push(marshalRelation(relationship, ControllerNodeType.CarModel))
    })

    relationships.race_tracks.forEach((relationship) => {
        marshalledData.data.race_tracks.data.push(marshalRelation(relationship, ControllerNodeType.RaceTrack))
    })

    relationships.track_layouts.forEach((relationship) => {
        marshalledData.data.track_layouts.data.push(marshalRelation(relationship, ControllerNodeType.TrackLayout))
    })

    relationships.racing_series.forEach((relationship) => {
        marshalledData.data.racing_series.data.push(marshalRelation(relationship, ControllerNodeType.RacingSeries))
    })

    relationships.racing_events.forEach((relationship) => {
        marshalledData.data.racing_events.data.push(marshalRelation(relationship, ControllerNodeType.RacingEvent))
    })

    return marshalledData
}
