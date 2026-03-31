import {Express} from "express"
import companies from "./node-types/companies"
import brands from './node-types/brands'
import carModels from "./node-types/car-models"
import carModelVariants from "./node-types/car-model-variants"
import prices from "./node-types/prices"
import raceTracks from "./node-types/race-tracks"
import trackLayouts from "./node-types/track-layouts"
import racingSeries from "./node-types/racing-series"
import racingEvents from "./node-types/racing-events"
import racingSessions from "./node-types/racing-sessions"
import sessionResults from "./node-types/session-results"
import lapTimes from "./node-types/lap-times"
import racingGames from "./node-types/racing-games"
import gamingPlatforms from "./node-types/gaming-platforms"
import modelCars from "./node-types/model-cars"
import modelCarBrands from "./node-types/model-car-brands"
import magazines from "./node-types/magazines"
import magazineIssues from "./node-types/magazine-issues"
import ratings from "./node-types/ratings"
import programmes from "./node-types/programmes"
import programmeEpisodes from "./node-types/programme-episodes"
import motorShows from "./node-types/motor-shows"
import videos from "./node-types/videos"
import images from "./node-types/images"

export function registerNodeTypeRoutes(app: Express) {
    app.use('/', companies)
    app.use('/', brands)
    app.use('/', carModels)
    app.use('/', carModelVariants)
    app.use('/', prices)
    app.use('/', raceTracks)
    app.use('/', trackLayouts)
    app.use('/', racingSeries)
    app.use('/', racingEvents)
    app.use('/', racingSessions)
    app.use('/', sessionResults)
    app.use('/', lapTimes)
    app.use('/', racingGames)
    app.use('/', gamingPlatforms)
    app.use('/', modelCars)
    app.use('/', modelCarBrands)
    app.use('/', magazines)
    app.use('/', magazineIssues)
    app.use('/', ratings)
    app.use('/', programmes)
    app.use('/', programmeEpisodes)
    app.use('/', motorShows)
    app.use('/', images)
    app.use('/', videos)
}
