import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import { REGISTRATION_ROUTE, LOGIN_ROUTE, HOME_ROUTE, PROFILE_ROUTE} from "./utils/consts"

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: Profile
    }
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
    // {
    //     path: REALT_ROUTE + '/:id',
    //     Component: RealtPage
    // },
    // {
    //     path: USER_ROUTE + '/:id',
    //     Component: UserPage
    // },
    // {
    //     path: NEWS_ROUTE,
    //     Component: NewsPage
    // },
]