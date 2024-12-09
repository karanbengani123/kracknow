import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Admin from './Admin';
import Studentview from './Studentview';
import Category from './Category';
import Categoryadd from './Categoryadd';
import StudentEdit from './StudentEdit';
import NewStudent from './NewStudent';
import SubCategory from './SubCategory';
import NewSubCategory from './NewSubCategory';
import UpdateSubCategory from './UpdateSubCategory';
import Subcategoryview from './Subcategoryview';
import Question from './Question';
import Categoryview from './Categoryview';
import Categoryedit from './Categoryedit';
import Studentlist from './Studentlist';
import Keywords from './Keywords';
import Exam from './Exam';
import Battle from './Battle';
import QuestionAdd from './QuestionAdd';
import QuestionEdit from './QuestionEdit';
import ExamNew from './ExamNew';
import QuestionImport from './QuestionImport';
import Cashfree from './Cashfree';
import Videofree from './Videofree';
import Withdraw from './Withdraw';
import EditProfile from './EditProfile';
import Keywordadd from './Keywordadd';
import Keywordedit from './Keywordedit';
import Keywordview from './Keywordview';
import NewAdmin from './NewAdmin';
import Feedback from './Feedback';
import Setting from './Setting';
import Settingadd from './Settingadd';
import Settingedit from './Settingedit';
import Tournament from './Tournament';
import UpdateRequest from './UpdateRequest'
import Tournamentadd from './Tournamentadd';
import Quiz from './Quiz';
import Questionview from './Questionview';
import Examview from './Examview';
import Banner from './Banner';
import ExamReview from './ExamReview';
import Adminview from './Adminview';
import Examedit from './Examedit';
import Tournamentview from './Tournamentview';
import Tournamentedit from './Tournamentedit';
import Quizadd from './Quizadd';
import Quizedit from './Quizedit';
import Quizview from './Quizview';
import Mocktest from './Mocktest';
import Mocktestadd from './Mocktestadd';
import Mocktestedit from './Mocktestedit';
import Mocktestview from './Mocktestview';
import Cashfreereview from './Cashfrereview';
import TournamentReview from './TournamentReview';
import BankTransaction from './BankTransaction';
import Payoutrequest from './Payoutrequest';
import Battleadd from './Battleadd';
import Battleedit from './Battleedit';
import Battleview from './Battleview';
import Bundle from './Bundle';
import NewBundle from './NewBundle';
import Bundleview from './Bundleview';
import ProtectedRoutes from './ProtectedRoutes';
import Forbidden from './Forbidden';
import Videofreeview from './Videofreeview';
import TournamentVideofreeview from './TournamentVideofreeview';

function AdminRouter() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/EditProfile" element={<EditProfile />}></Route>
        <Route exact path="/Dashboard" element={ <ProtectedRoutes cmp={Dashboard} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Forbidden" element={<Forbidden />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/Studentlist" element={ <ProtectedRoutes cmp={Studentlist} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}/>
        <Route exact path="/Studentview/:uuid" element={ <ProtectedRoutes cmp={Studentview} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/StudentEdit/:uuid" element={ <ProtectedRoutes cmp={StudentEdit} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/NewStudent" element={ <ProtectedRoutes cmp={NewStudent} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/Category" element={ <ProtectedRoutes cmp={Category} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/SubCategory" element={ <ProtectedRoutes cmp={SubCategory} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Categoryadd" element={ <ProtectedRoutes cmp={Categoryadd} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Categoryview/:uuid" element={ <ProtectedRoutes cmp={Categoryview} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Categoryedit/:uuid" element={ <ProtectedRoutes cmp={Categoryedit} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/NewSubCategory" element={ <ProtectedRoutes cmp={NewSubCategory} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/UpdateSubCategory/:uuid" element={ <ProtectedRoutes cmp={UpdateSubCategory} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Subcategoryview/:uuid" element={ <ProtectedRoutes cmp={Subcategoryview} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/Keywords" element={ <ProtectedRoutes cmp={Keywords} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Keywordadd" element={ <ProtectedRoutes cmp={Keywordadd} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Keywordedit/:uuid" element={ <ProtectedRoutes cmp={Keywordedit} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Keywordview/:uuid" element={ <ProtectedRoutes cmp={Keywordview} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/Exam" element={ <ProtectedRoutes cmp={Exam} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/ExamNew" element={ <ProtectedRoutes cmp={ExamNew} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Examview/:uuid" element={ <ProtectedRoutes cmp={Examview} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/ExamReview/:scheduleUUID/:studentUUID" element={ <ProtectedRoutes cmp={ExamReview} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        {/* <Route exact path="/ExamReview/:scheduleUUID/:studentUUID" element={<ExamReview/>}></Route> */}
        <Route exact path="/Examedit/:uuid" element={ <ProtectedRoutes cmp={Examedit} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Quiz" element={ <ProtectedRoutes cmp={Quiz} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Quizadd" element={ <ProtectedRoutes cmp={Quizadd} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Quizedit/:uuid" element={ <ProtectedRoutes cmp={Quizedit} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Quizview/:uuid" element={ <ProtectedRoutes cmp={Quizview} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Mocktest" element={ <ProtectedRoutes cmp={Mocktest} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Mocktestadd" element={ <ProtectedRoutes cmp={Mocktestadd} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Mocktestedit/:uuid" element={ <ProtectedRoutes cmp={Mocktestedit} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Mocktestview/:uuid" element={ <ProtectedRoutes cmp={Mocktestview} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Tournament" element={ <ProtectedRoutes cmp={Tournament} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Tournamentadd" element={ <ProtectedRoutes cmp={Tournamentadd} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Tournamentview/:uuid" element={ <ProtectedRoutes cmp={Tournamentview} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Tournamentedit/:uuid" element={ <ProtectedRoutes cmp={Tournamentedit} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/TournamentReview/:tournamentScheduleUUID/:studentUUID" element={ <ProtectedRoutes cmp={TournamentReview} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Battle" element={ <ProtectedRoutes cmp={Battle} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Battleadd" element={ <ProtectedRoutes cmp={Battleadd} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Battleedit/:uuid" element={ <ProtectedRoutes cmp={Battleedit} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Battleview/:uuid" element={ <ProtectedRoutes cmp={Battleview} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/Question" element={ <ProtectedRoutes cmp={Question} allowedRoles={["SUPER_ADMIN","ADMIN","QUESTION_CREATOR"]} />}></Route>
        <Route exact path="/QuestionAdd" element={ <ProtectedRoutes cmp={QuestionAdd} allowedRoles={["SUPER_ADMIN","ADMIN","QUESTION_CREATOR"]} />}></Route>
        <Route exact path="/QuestionEdit/:uuid" element={ <ProtectedRoutes cmp={QuestionEdit} allowedRoles={["SUPER_ADMIN","ADMIN","QUESTION_CREATOR"]} />}></Route>
        <Route exact path="/QuestionImport" element={ <ProtectedRoutes cmp={QuestionImport} allowedRoles={["SUPER_ADMIN","ADMIN","QUESTION_CREATOR"]} />}></Route>
        <Route exact path="/Questionview/:uuid" element={ <ProtectedRoutes cmp={Questionview} allowedRoles={["SUPER_ADMIN","ADMIN","QUESTION_CREATOR"]} />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/Admin" element={ <ProtectedRoutes cmp={Admin} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Adminview/:uuid" element={ <ProtectedRoutes cmp={Adminview} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Cashfree" element={ <ProtectedRoutes cmp={Cashfree} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/Videofree" element={ <ProtectedRoutes cmp={Videofree} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Videofreeview/:uuid" element={ <ProtectedRoutes cmp={Videofreeview} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/TournamentVideofreeview/:uuid" element={ <ProtectedRoutes cmp={TournamentVideofreeview} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/payoutrequest" element={ <ProtectedRoutes cmp={BankTransaction} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/payoutrequest/:uuid" element={ <ProtectedRoutes cmp={Payoutrequest} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        

        <Route exact path="/Cashfreereview/:uuid" element={ <ProtectedRoutes cmp={Cashfreereview} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/NewAdmin" element={ <ProtectedRoutes cmp={NewAdmin} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Withdraw" element={ <ProtectedRoutes cmp={Withdraw} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>
        <Route exact path="/UpdateRequest/:uuid" element={ <ProtectedRoutes cmp={UpdateRequest} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Feedback" element={ <ProtectedRoutes cmp={Feedback} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Setting" element={ <ProtectedRoutes cmp={Setting} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Settingadd" element={ <ProtectedRoutes cmp={Settingadd} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Settingedit" element={ <ProtectedRoutes cmp={Settingedit} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Banner" element={ <ProtectedRoutes cmp={Banner} allowedRoles={["SUPER_ADMIN","ADMIN","EXAM_CREATOR"]} />}></Route>

        <Route exact path="/Bundle" element={ <ProtectedRoutes cmp={Bundle} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/NewBundle" element={ <ProtectedRoutes cmp={NewBundle} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/NewBundle/:id" element={ <ProtectedRoutes cmp={NewBundle} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        <Route exact path="/Bundleview/:id" element={ <ProtectedRoutes cmp={Bundleview} allowedRoles={["SUPER_ADMIN","ADMIN"]} />}></Route>
        
      </Routes>
      {/* <ProtectedRoutes/> */}
    </div>
  );
}
export default AdminRouter;