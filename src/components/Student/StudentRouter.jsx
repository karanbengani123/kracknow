import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Exam from './Exam';
import EditProfile from './EditProfile';
import Tournament from './Tournament';
import ForgotPassword from './ForgotPassword';
import Register from './Register';
import Register2 from './Register2';
import Quiz from "./Quiz"
import Wallet from './Wallet';
import Howtoplay from './Howtoplay';
import Tournamentregister from './Tournamentregister';
import Wallettobank from './Wallettobank';
import Wallettobank1 from './Wallettobank1';
import Addmoney from './Addmoney';
import Completedtournament from './Completedtournament';
import Leaderboard from './Leaderboard';
import Completedexam from './Completedexam';
import Quizpage from "./Quizpage"
import Mocktest from "./Mocktest";
import Registerquiz from "./Registerquiz"
import Completedquiz from './Completedquiz';
import QuizNavbar from './QuizNavbar';
import Review from './Review';
import CompletedExamReview from './CompletedExamReview';
import Notification from './Notification';
import Wallethistory from './Wallethistory';



function AdminRouter() {
  return (
    <div className="App">           
      <Routes>
        <Route exact path="/EditProfile" element={<EditProfile />}></Route>
        <Route exact path="/Dashboard" element={<Dashboard />}></Route>
        <Route exact path="/Exam" element={<Exam />}></Route>
        <Route exact path="/Tournament" element={<Tournament />}></Route>
        <Route exact path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route exact path="/Register" element={<Register />}></Route>
        <Route exact path="/Register2/:uuid" element={<Register2 />}></Route>
        <Route exact path="/Quiz/:uuid/:examParticipantUUID/:examScheduleUUID" element={<Quiz />}></Route>
        {/* <Route exact path="/QuizNavbar/:uuid" element={<QuizNavbar />}></Route> */}
        <Route exact path="/Leaderboard/:uuid" element={<Leaderboard />}></Route>
        <Route exact path="/Review/:uuid" element={<Review />}></Route>
        <Route exact path="/CompletedExamReview/:uuid" element={<CompletedExamReview />}></Route>
        <Route exact path="/Wallet" element={<Wallet />}></Route>
        <Route exact path="/Howtoplay" element={<Howtoplay />}></Route>
        <Route exact path="/Tournamentregister" element={<Tournamentregister />}></Route>
        <Route exact path="/Wallettobank" element={<Wallettobank />}></Route>
        <Route exact path="/Wallettobank1" element={<Wallettobank1 />}></Route>
        <Route exact path="/Addmoney" element={<Addmoney />}></Route>
        <Route exact path="/Completedtournament" element={<Completedtournament />}></Route>
        <Route exact path="/Completedexam" element={<Completedexam />}></Route>
        <Route exact path="/Quizpage" element={<Quizpage />}></Route>
        <Route exact path="/Mocktest" element={<Mocktest />}></Route>
        <Route exact path="/Registerquiz" element={<Registerquiz />}></Route>
        <Route exact path="/Completedquiz" element={<Completedquiz />}></Route>
        <Route exact path="/Notification" element={<Notification />}></Route>
        <Route exact path="/Wallethistory" element={<Wallethistory />}></Route>
        {/* <Route exact path="/Completedexamexam" element={<Completedexam/>}></Route> */}
      </Routes>
    </div>
  );
}
export default AdminRouter;
