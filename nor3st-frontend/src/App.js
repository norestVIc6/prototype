import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import LayoutAdmin from './layouts/LayoutAdmin'
// import Profile from './old_files/componnent/Profile';
// import DashBoard from './old_files/componnent/DashBoard';
// import Rankings from './old_files/componnent/Rankings';
// import Management from './old_files/componnent/Managements';
import Layout from './layouts/Layout';
import LayoutLogin from './layouts/LayoutLogin';
import PageA from './components/PageA';
import LayoutProfile from './layouts/Profile';
import Education_old from './components/Education';
import Education from './components/EducationV2';
import EducationListen from './components/EducationListen';
import Score from './components/Score';
import ManagementsV2 from './components/ManagementsV2';
import ManagementsDetailV2 from './components/ManagementsDetailV2';
import ManagementsModify from './components/ManagementsModify';
import DashBoardV2 from './layouts/DashBoardV2';
import DashBoardV2Member from './layouts/DashBoardV2Member';
import DashBoardMain from './components/DashBoardMain';
import Analytics from './components/Analytics';
import Progress from './components/Progress';
import LayoutEducation from './layouts/LayoutEducation';
import ProfileV2 from './components/ProfileV2';
import LayoutAdminV2 from './layouts/LayoutAdminV2';
import RankingsV2 from './components/RankingsV2';
import Simulation from './components/Simulation';
import SimulationLevel from './components/SimulationLevel';
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path='/' element={<PageA/>}/>          
        </Route>
        <Route path='/login' element={<LayoutLogin/>}/>

        <Route path='/' element={<LayoutProfile/>}>
          {/* <Route path='/profile' element={<Profile/>}/>           */}
          <Route path='/profile' element={<ProfileV2/>}/>          
          <Route path='/score' element={<Score/>}/>
          <Route path='/simulation' element={<Simulation/>}/>
          <Route path='/test' element={<SimulationLevel/>}/>
        </Route>
        
        <Route path='/' element={<LayoutEducation/>}>
          <Route path='/education' element={<Education/>}/>
          <Route path='/educationold' element={<Education_old/>}/>
          <Route path='/listen' element={<EducationListen/>}/>
        </Route>        
        {/* <Route path='/' element={<LayoutAdmin/>}>          
          <Route path='/dashboard' element={<DashBoard/>}>
            <Route path='/dashboard/Rankings' element={<Rankings/>}/>
            <Route path='/dashboard/Members' element={<Management/>}/>
          </Route>
        </Route> */}
        <Route path='/admin' element={<LayoutAdminV2/>}>
          <Route path='/admin/dashboard' element={<DashBoardV2/>}>
            <Route path='/admin/dashboard/' element={<DashBoardMain/>}/>
            <Route path='/admin/dashboard/Ranking' element={<RankingsV2/>}/>
            <Route path='/admin/dashboard/Progress' element={<Progress/>}/>
            <Route path='/admin/dashboard/Analytics' element={<Analytics/>}/>
          </Route>
          <Route path='/admin/Members' element={<DashBoardV2Member/>}>
            <Route path='/admin/Members/' element={<ManagementsV2/>}/>
            <Route path='/admin/Members/Detail' element={<ManagementsDetailV2/>}/>
            <Route path='/admin/Members/modify' element={<ManagementsModify/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
