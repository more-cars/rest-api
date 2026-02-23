import {expect, test} from 'vitest'
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import type {ImageBelongsToNodeTypeRelationships} from "../../../../../../src/models/node-types/images/types/ImageBelongsToNodeTypeRelationships"
import {marshalBelongsToNodeTypeRelationships} from "../../../../../../src/controllers/node-types/images/marshalling/marshalBelongsToNodeTypeRelationships"
import {convertModelRelationToControllerRelation} from "../../../../../../src/controllers/relations/convertModelRelationToControllerRelation"
import {marshalRelation} from "../../../../../../src/controllers/relations/marshalRelation"
import type {ImageBelongsToNodeTypeResponse} from "../../../../../../src/controllers/node-types/images/types/ImageBelongsToNodeTypeResponse"

test('marshalling a ›belongs-to-node-type‹ relationship collection', async () => {
    const companyRel = getFakeRel(RelType.CompanyHasImage)
    const brandRel = getFakeRel(RelType.BrandHasImage)
    const carModelRel = getFakeRel(RelType.CarModelHasImage)
    const carModelVariantRel = getFakeRel(RelType.CarModelVariantHasImage)
    const raceTrackRel = getFakeRel(RelType.RaceTrackHasImage)
    const trackLayoutRel = getFakeRel(RelType.TrackLayoutHasImage)
    const racingSeriesRel = getFakeRel(RelType.RacingSeriesHasImage)
    const racingEventRel = getFakeRel(RelType.RacingEventHasImage)
    const racingSessionRel = getFakeRel(RelType.RacingSessionHasImage)
    const sessionResultRel = getFakeRel(RelType.SessionResultHasImage)
    const lapTimeRel = getFakeRel(RelType.LapTimeHasImage)
    const racingGameRel = getFakeRel(RelType.RacingGameHasImage)
    const gamingPlatformRel = getFakeRel(RelType.GamingPlatformHasImage)

    const relationships: ImageBelongsToNodeTypeRelationships = {
        companies: [companyRel],
        brands: [brandRel],
        car_models: [carModelRel],
        car_model_variants: [carModelVariantRel],
        race_tracks: [raceTrackRel],
        track_layouts: [trackLayoutRel],
        racing_series: [racingSeriesRel],
        racing_events: [racingEventRel],
        racing_sessions: [racingSessionRel],
        session_results: [sessionResultRel],
        lap_times: [lapTimeRel],
        racing_games: [racingGameRel],
        gaming_platforms: [gamingPlatformRel],
    }

    const mappedNode = marshalBelongsToNodeTypeRelationships(relationships)

    expect(mappedNode)
        .toStrictEqual({
            data: {
                companies: {
                    data: [marshalRelation(convertModelRelationToControllerRelation(companyRel))],
                },
                brands: {
                    data: [marshalRelation(convertModelRelationToControllerRelation(brandRel))],
                },
                car_models: {
                    data: [marshalRelation(convertModelRelationToControllerRelation(carModelRel))],
                },
                car_model_variants: {
                    data: [marshalRelation(convertModelRelationToControllerRelation(carModelVariantRel))],
                },
                race_tracks: {
                    data: [marshalRelation(convertModelRelationToControllerRelation(raceTrackRel))],
                },
                track_layouts: {
                    data: [marshalRelation(convertModelRelationToControllerRelation(trackLayoutRel))],
                },
                racing_series: {
                    data: [marshalRelation(convertModelRelationToControllerRelation(racingSeriesRel))],
                },
                racing_events: {
                    data: [marshalRelation(convertModelRelationToControllerRelation(racingEventRel))],
                },
                racing_sessions: {
                    data: [marshalRelation(convertModelRelationToControllerRelation(racingSessionRel))],
                },
                session_results: {
                    data: [marshalRelation(convertModelRelationToControllerRelation(sessionResultRel))],
                },
                lap_times: {
                    data: [marshalRelation(convertModelRelationToControllerRelation(lapTimeRel))],
                },
                racing_games: {
                    data: [marshalRelation(convertModelRelationToControllerRelation(racingGameRel))],
                },
                gaming_platforms: {
                    data: [marshalRelation(convertModelRelationToControllerRelation(gamingPlatformRel))],
                },
            }
        } satisfies ImageBelongsToNodeTypeResponse)
})
