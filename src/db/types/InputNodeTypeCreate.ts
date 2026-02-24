import type {InputCompanyCreate} from "../node-types/companies/types/InputCompanyCreate"
import type {InputBrandCreate} from "../node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../node-types/car-models/types/InputCarModelCreate"
import type {InputCarModelVariantCreate} from "../node-types/car-model-variants/types/InputCarModelVariantCreate"
import type {InputRaceTrackCreate} from "../node-types/race-tracks/types/InputRaceTrackCreate"
import type {InputTrackLayoutCreate} from "../node-types/track-layouts/types/InputTrackLayoutCreate"
import type {InputRacingSeriesCreate} from "../node-types/racing-series/types/InputRacingSeriesCreate"
import type {InputRacingEventCreate} from "../node-types/racing-events/types/InputRacingEventCreate"
import type {InputRacingSessionCreate} from "../node-types/racing-sessions/types/InputRacingSessionCreate"
import type {InputSessionResultCreate} from "../node-types/session-results/types/InputSessionResultCreate"
import type {InputLapTimeCreate} from "../node-types/lap-times/types/InputLapTimeCreate"
import type {InputRacingGameCreate} from "../node-types/racing-games/types/InputRacingGameCreate"
import type {InputGamingPlatformCreate} from "../node-types/gaming-platforms/types/InputGamingPlatformCreate"
import type {InputImageCreate} from "../node-types/images/types/InputImageCreate"

export type InputNodeTypeCreate =
    InputCompanyCreate |
    InputBrandCreate |
    InputCarModelCreate |
    InputCarModelVariantCreate |
    InputRaceTrackCreate |
    InputTrackLayoutCreate |
    InputRacingSeriesCreate |
    InputRacingEventCreate |
    InputRacingSessionCreate |
    InputSessionResultCreate |
    InputLapTimeCreate |
    InputRacingGameCreate |
    InputGamingPlatformCreate |
    InputImageCreate
