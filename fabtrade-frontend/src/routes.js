import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import { REGISTRATION_ROUTE, LOGIN_ROUTE, HOME_ROUTE, PROFILE_ROUTE, TENDER_ROUTE, REQUEST_ROUTE, TENDERS_ROUTE} from "./utils/consts"
import TenderPage from "./pages/TenderPage"
import TendersPage from "./pages/TendersPage"
import RequestPage from "./pages/RequestPage"

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: REQUEST_ROUTE + '/:id',
        Component: RequestPage
    },
]


export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: TENDER_ROUTE + '/:id',
        Component: TenderPage
    },
    {
        path: TENDERS_ROUTE,
        Component: TendersPage
    },
]