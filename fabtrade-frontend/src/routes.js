import Home from "./pages/Home"
import Auth from "./pages/Auth"
import { REGISTRATION_ROUTE, LOGIN_ROUTE, HOME_ROUTE} from "./utils/consts"

export const authRoutes = [
    // {
    //     path: FAVORITE_ROUTE,
    //     Component: FavoritePage
    // },
    // {
    //     path: PROFILE_ROUTE,
    //     Component: Profile
    // }
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