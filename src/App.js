import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserRegister from "./components/UserAuthentication/UserRegister/UserRegister";
import UserLogin from "./components/UserAuthentication/UserLogin/UserLogin";
import UserHomePage from "./components/pages/UserHomePage";
import HomePage from "./components/pages/HomePage";
import UserDashboard from "./components/pages/userDashboard/UserDashboard";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";
import AdminDashboard from "./components/pages/AdminDashboard/AdminDashborad";
import Catergory from "./components/pages/AdminDashboard/categorySection/Catergory";
import { Toaster } from "react-hot-toast";
import Search from "./components/Products/filterMovies/Search";
import SearchPage from "./components/pages/SearchpPage";
import MovieSlider from "./components/Products/movies-slider/MovieSlider";
import NewMovies from "./components/MovieCategory/NewMovies/NewMovies";
import CreateMovie from "./components/pages/AdminDashboard/MovieSection/CreateMovie";
import UpdateMovie from "./components/pages/AdminDashboard/MovieSection/UpdateMovie";
import Movies from "./components/pages/AdminDashboard/MovieSection/movies";
import MovieDescription from "./components/pages/MovieDescription";
import CategoryButtons from "./components/MovieCategory/MovieCategoryButtons/CategoryButtons";
import MoviesByCategory from "./components/MovieCategory/MovieCategoryButtons/MoviesByCategory";
import ForgotPassword from "./components/UserAuthentication/ForgotPassword/ForgotPassword";
import Otppage from "./components/UserAuthentication/OtpPage/Otppage";
import PasswordReset from "./components/UserAuthentication/passwordReset/PasswordReset";
function App() {

  return (
    <div className="App">
      <Toaster
        containerStyle={{
          position: "absolute",
          top: "30px",
          left: "-60px",
        }}
      />
      {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/SearchPage" element={<SearchPage />} />
          <Route path="/UserHomepage" element={<UserHomePage />} />
          <Route path="/UserRegister" element={<UserRegister />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Otppage" element={<Otppage />} />
          <Route path="/PasswordReset" element={<PasswordReset />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/Catergory" element={<Catergory />} />
          <Route path="/CategoryButtons" element={<CategoryButtons />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/MovieSlider" element={<MovieSlider />} />
          <Route path="/NewMovies" element={<NewMovies />} />
          <Route
            path={`/MovieDescription/:id`}
            element={<MovieDescription />}
          />
          <Route path="/CreateMovie" element={<CreateMovie />} />

          <Route
            path={`/UpdateMovie/:movieId/:productName`}
            element={<UpdateMovie />}
          />
          <Route
            path="/MoviesByCategory/:categoryId/:categoryName"
            element={<MoviesByCategory />}
          />
        </Routes>
      {/* <SwipeableTemporaryDrawer/> */}
    </div>
  );
}

export default App;
