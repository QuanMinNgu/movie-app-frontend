import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';
import HomePage from './components/home/HomePage';
import Header from './components/header/Header';
import MovieOddDetail from './components/MovieDetail/MovieOddDetail';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import Login from './components/auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import decode_jwt from 'jwt-decode';
import Loading from './components/utils/Loading';
import CraeteMovieDetaile from './components/auth/CraeteMovieDetaile';
import {useRef} from 'react';
import { isLogOut } from './components/redux/slice/AuthSlice';
import EditMovieContainer from './components/auth/EditMovieContainer';
import MovieList from './movieList/MovieList';
import WatchContainer from './watch/WatchContainer';
function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const cache = useRef({});
  useEffect(() => {
    let date = new Date();
    if(auth.user){
      const decoded = decode_jwt(auth.user.accessToken);
      if(decoded.exp < date.getTime() / 1000){
        dispatch(isLogOut());
      }
    }
  },[]);
  return (
    <Router>
      <div className="App">
          <Header />
          <NavBar />
          <Routes>
            <Route path='/movie/create' exact element={<CraeteMovieDetaile />}/>
            <Route path='/admin/login' exact element={<Login />}/>
            <Route path='/watch/:slug' exact element={<WatchContainer cache={cache} />}/>
            <Route path='/danh-sach/:list' exact element={<MovieList cache={cache} />}/>
            <Route path='/edit/:slug' exact element={<EditMovieContainer />}/>
            <Route path='/:slug' exact element={<MovieOddDetail cache={cache}/>}/>
            <Route path='/' exact element={<HomePage cache={cache}/>}/>
          </Routes>
          <Footer />
          <ToastContainer style={{fontSize:"1.5rem"}}/>
          {auth.loading && <Loading />}
      </div>
    </Router>
  );
}

export default App;
