import type {ImageBelongsToNodeTypeRelationships} from "../../../../models/node-types/images/types/ImageBelongsToNodeTypeRelationships"
import type {ImageBelongsToNodeTypeResponse} from "../types/ImageBelongsToNodeTypeResponse"
import {marshalRelation} from "../../../relations/marshalRelation"
import {convertModelRelationToControllerRelation} from "../../../relations/convertModelRelationToControllerRelation"

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
        marshalledData.data.companies.data.push(marshalRelation(convertModelRelationToControllerRelation(relationship)))
    })

    relationships.brands.forEach((relationship) => {
        marshalledData.data.brands.data.push(marshalRelation(convertModelRelationToControllerRelation(relationship)))
    })

    relationships.car_models.forEach((relationship) => {
        marshalledData.data.car_models.data.push(marshalRelation(convertModelRelationToControllerRelation(relationship)))
    })

    relationships.race_tracks.forEach((relationship) => {
        marshalledData.data.race_tracks.data.push(marshalRelation(convertModelRelationToControllerRelation(relationship)))
    })

    relationships.track_layouts.forEach((relationship) => {
        marshalledData.data.track_layouts.data.push(marshalRelation(convertModelRelationToControllerRelation(relationship)))
    })

    relationships.racing_series.forEach((relationship) => {
        marshalledData.data.racing_series.data.push(marshalRelation(convertModelRelationToControllerRelation(relationship)))
    })

    relationships.racing_events.forEach((relationship) => {
        marshalledData.data.racing_events.data.push(marshalRelation(convertModelRelationToControllerRelation(relationship)))
    })

    return marshalledData
}
