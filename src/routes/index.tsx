import configRoute from '../config';
import { lazy } from 'react';
const AuthTheme = lazy(() => import("../themes").then(module => {
  return { default: module.AuthTheme }
})) 

// import SignIn from "../pages/auth/SignIn";
const SignIn = lazy(() => import("../pages/auth/SignIn"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));
const BookChair = lazy(() => import("../pages/client/bookChair/BookChair"));
const TickitPrice = lazy(() => import("../pages/client/TickitPrice/TickitPrice"));
const Home = lazy(() => import("../pages/client/home/Home"));
const Complete = lazy(() => import("../pages/auth/complete"));

// admin
const UserCreate = lazy(() => import("../pages/admin/User/Create"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard/DashBoard"));
const UserEdit = lazy(() => import("../pages/admin/User/Update"));

const CreateMovieType = lazy(() => import("../pages/admin/MovieType/CreateMovieType"));
const ListMovieType = lazy(() => import("../pages/admin/MovieType/ListMovieType"));

const ListSeatType = lazy(() => import("../pages/admin/SeatType/ListSeatType"));
const CeateSeatType = lazy(() => import("../pages/admin/SeatType/CeateSeatType"));
const UploadSeatType = lazy(() => import("../pages/admin/SeatType/UploadSeatType"));

const ListCategories = lazy(() => import("../pages/admin/categories/List"));
const EditMovieType = lazy(() => import("../pages/admin/MovieType/EditMovieType"));
const CreateCategory = lazy(() => import("../pages/admin/categories/Create"));

const AdminRoomList = lazy(() => import("../pages/admin/Rooms/List"));
const AdminRoomCreate = lazy(() => import("../pages/admin/Rooms/Create"));
const AdminRoomEdit = lazy(() => import("../pages/admin/Rooms/Edit"));
const AdminShowTimesCreate = lazy(() => import("../pages/admin/showTime/Create"));
const FilmFormatList = lazy(() => import("../pages/admin/FilmFormat/List"));
const CreateMovie = lazy(() => import("../pages/admin/Movie/CreateMovie"));
const UpdateMovies = lazy(() => import("../pages/admin/Movie/UpdateMovie"));
const News = lazy(() => import("../pages/client/News/News"));

const AdminVoucherList = lazy(() => import("../pages/admin/voucher/List"));
const AdminVoucherCreate = lazy(() => import("../pages/admin/voucher/Create"));
const AdminVoucherEdit = lazy(() => import("../pages/admin/voucher/Edit"));

const AdminPosts = lazy(() => import("../pages/admin/Post/index"));
const AdminPostsCreate = lazy(() => import("../pages/admin/Post/Create"));
const AdminPostsEdit = lazy(() => import("../pages/admin/Post/Edit"));
const NewsDetail = lazy(() => import("../pages/client/NewsDetail"));
const Search = lazy(() => import("../pages/client/search/Search"));
const FoodList = lazy(() => import("../pages/admin/Food/FoodList"));
const CreateFood = lazy(() => import("../pages/admin/Food/CreateFood"));
const UpdateFood = lazy(() => import("../pages/admin/Food/UpdateFood"));
const CreateSlider = lazy(() => import("../pages/admin/Slider/CreateSlider"));
const AdminSlider = lazy(() => import("../pages/admin/Slider/AdminSlider"));
const UpdateSlider = lazy(() => import("../pages/admin/Slider/UpdateSlider"));
const Profile = lazy(() => import("../pages/client/profile"));
const WebConfig = lazy(() => import("../pages/admin/Config"));
const WebConfigCreate = lazy(() => import("../pages/admin/Config/Create"));
const WebConfigEdit = lazy(() => import("../pages/admin/Config/Edit"));
const VoucherContent = lazy(() => import("../components/client/VoucherContent"));
const SeatByRoom = lazy(() => import("../pages/admin/Seats/seatByRoom"));
const Payment = lazy(() => import("../pages/client/payment/Payment"));
const ForgotPass = lazy(() => import("../pages/auth/ForgotPassword"));
const Contact = lazy(() => import("../components/client/Contact"));
const EditCategory = lazy(() => import("../pages/admin/categories/Edit"));
const ListCommentMovie = lazy(() => import("../pages/admin/comment"));
const ChooseCombo = lazy(() => import("../components/client/ChooseCombo"));
const LoadingPushAccountInLocalStorage = lazy(() => import("../components/client/loadingPushAccountInLocalStorage"));
const AdminOrdersDetail = lazy(() => import("../pages/admin/Order/Detail"));
const FindOrder = lazy(() => import("../pages/client/findOrder"));
const PaymentStatus = lazy(() => import("../components/client/PaymentStatus"));
const OrderTab = lazy(() => import("../pages/admin/Order"));
const NestedTable = lazy(() => import("../pages/admin/showTime/NestedTable"));
const CancelOrder = lazy(() => import("../components/client/CancelOrder"));
const CheckOrder = lazy(() => import("../pages/client/CheckOrder"));
const MovieTab = lazy(() => import("../pages/admin/Movie"));
const ListShowTimeByRoom = lazy(() => import("../pages/admin/Rooms/ListShowTimeByRoom"));
const UserTab = lazy(() => import("../pages/admin/User/UserTab"));
const DetailMovie = lazy(() => import("../pages/client/movieDetail"));
const AdminVoucherTab = lazy(() => import("../pages/admin/voucher/Tab"))
type RoutesType = {
  path: string;
  component: any;
  layout?: any;
  title?: string;
};

export const publicRoutes: RoutesType[] = [
  { path: configRoute.routes.signin, component: SignIn, layout: AuthTheme },
  { path: configRoute.routes.signup, component: SignUp, layout: AuthTheme },
  { path: configRoute.routes.home, component: Home },
  { path: configRoute.routes.detail, component: DetailMovie },
  { path: configRoute.routes.bookChair, component: BookChair },
  { path: configRoute.routes.tickitPrice, component: TickitPrice },
  { path: configRoute.routes.news, component: News },
  { path: configRoute.routes.newsCate2, component: News },
  { path: configRoute.routes.newsDetail, component: NewsDetail },
  { path: configRoute.routes.search, component: Search },
  { path: configRoute.routes.profile, component: Profile },
  { path: configRoute.routes.verify, component: Complete },
  { path: configRoute.routes.voucherDetail, component: VoucherContent },
  { path: configRoute.routes.payment, component: Payment },
  { path: configRoute.routes.forgotPass, component: ForgotPass },
  { path: configRoute.routes.resetPassword, component: ForgotPass },
  { path: configRoute.routes.contact, component: Contact },
  { path: configRoute.routes.loadingPushAccountInLocalStorage, component: LoadingPushAccountInLocalStorage },
  { path: configRoute.routes.chooseCombo, component: ChooseCombo },
  { path: configRoute.routes.paymentStatus, component: PaymentStatus },
  { path: configRoute.routes.findOrder, component: FindOrder },
  { path: configRoute.routes.cancelOrder, component: CancelOrder },
  { path: configRoute.routes.checkOrder, component: CheckOrder },
  { path: "*", component: NotFoundPage, layout: null },
];

export const privateRoutes: RoutesType[] = [
  { path: configRoute.routes.dashboard, component: Dashboard },

  { path: configRoute.routes.adminUserList, component: UserTab },
  { path: configRoute.routes.adminUserAdd, component: UserCreate },
  { path: configRoute.routes.adminUserUpdate, component: UserEdit },

  { path: configRoute.routes.adminMovieTypeEdit, component: EditMovieType },
  { path: configRoute.routes.adminMovieTypeAdd, component: CreateMovieType },
  { path: configRoute.routes.adminMovieType, component: ListMovieType },

  { path: configRoute.routes.adminFood, component: FoodList },
  { path: configRoute.routes.adminFoodCreate, component: CreateFood },
  { path: configRoute.routes.adminFoodUpdate, component: UpdateFood },

  { path: configRoute.routes.adminSlider, component: AdminSlider },
  { path: configRoute.routes.adminSliderCreate, component: CreateSlider },
  { path: configRoute.routes.adminSliderUpdate, component: UpdateSlider },

  { path: configRoute.routes.adminSeatType, component: ListSeatType },
  { path: configRoute.routes.adminSeatTypeAdd, component: CeateSeatType },
  { path: configRoute.routes.adminSeatTypeUpdate, component: UploadSeatType },

  { path: configRoute.routes.adminCategories, component: ListCategories },
  { path: configRoute.routes.adminCategoriesCreate, component: CreateCategory },
  { path: configRoute.routes.adminCategoryEdit, component: EditCategory },

  { path: configRoute.routes.adminMoviecCreat, component: CreateMovie },
  { path: configRoute.routes.adminMovie, component: MovieTab },
  { path: configRoute.routes.adminMoviecUpdate, component: UpdateMovies },

  { path: configRoute.routes.adminRooms, component: AdminRoomList },
  { path: configRoute.routes.adminRoomsCreate, component: AdminRoomCreate },
  { path: configRoute.routes.adminRoomEdit, component: AdminRoomEdit },

  { path: configRoute.routes.AdminShowTimes, component: NestedTable },
  { path: configRoute.routes.AdminShowTimesCreate, component: AdminShowTimesCreate },
  { path: configRoute.routes.showTimeByRoom, component: ListShowTimeByRoom },


  { path: configRoute.routes.AdminFilmFormat, component: FilmFormatList },

  { path: configRoute.routes.AdminVouchers, component: AdminVoucherTab },
  { path: configRoute.routes.AdminVouchersCreate, component: AdminVoucherCreate },
  { path: configRoute.routes.AdminVouchersEdit, component: AdminVoucherEdit },

  { path: configRoute.routes.AdminPosts, component: AdminPosts },
  { path: configRoute.routes.AdminPostsCreate, component: AdminPostsCreate },
  { path: configRoute.routes.AdminPostsEdit, component: AdminPostsEdit },

  { path: configRoute.routes.webConfig, component: WebConfig },
  { path: configRoute.routes.webConfigAdd, component: WebConfigCreate },
  { path: configRoute.routes.webConfigEdit, component: WebConfigEdit },
  { path: configRoute.routes.AdminSeatByRoom, component: SeatByRoom },
  { path: configRoute.routes.adminOrders, component: OrderTab },
  { path: configRoute.routes.adminOrdersDetail, component: AdminOrdersDetail },
  { path: configRoute.routes.adminListCommentMovie, component: ListCommentMovie }
];
