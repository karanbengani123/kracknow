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
import QuestionAdd from './QuestionAdd';
import QuestionEdit from './QuestionEdit';
import ExamNew from './ExamNew';
import QuestionImport from './QuestionImport';
import Cashfree from './Cashfree';
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



function AdminRouter() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/EditProfile" element={<EditProfile />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/Dashboard" element={<Dashboard />}></Route>
        <Route exact path="/Studentlist" element={<Studentlist />}></Route>
        <Route exact path="/Studentview/:uuid" element={<Studentview />}></Route>
        <Route exact path="/StudentEdit/:uuid" element={<StudentEdit />}></Route>
        <Route exact path="/NewStudent" element={<NewStudent />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/Category" element={<Category />}></Route>
        <Route exact path="/SubCategory" element={<SubCategory />}></Route>
        <Route exact path="/Categoryadd" element={<Categoryadd />}></Route>
        <Route exact path="/Categoryview/:uuid" element={<Categoryview />}></Route>
        <Route exact path="/Categoryedit/:uuid" element={<Categoryedit />}></Route>
        <Route exact path="/NewSubCategory" element={<NewSubCategory />}></Route>
        <Route exact path="/UpdateSubCategory/:uuid" element={<UpdateSubCategory />}></Route>
        <Route exact path="/Subcategoryview/:uuid" element={<Subcategoryview />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/Keywords" element={<Keywords />}></Route>
        <Route exact path="/Keywordadd" element={<Keywordadd />}></Route>
        <Route exact path="/Keywordedit/:uuid" element={<Keywordedit />}></Route>
        <Route exact path="/Keywordview/:uuid" element={<Keywordview />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/Exam" element={<Exam />}></Route>
        <Route exact path="/ExamNew" element={<ExamNew />}></Route>
        <Route exact path="/Examview/:uuid" element={<Examview/>}></Route>
        <Route exact path="/ExamReview/:scheduleUUID/:studentUUID" element={<ExamReview/>}></Route>
        <Route exact path="/ExamReview/:scheduleUUID/:studentUUID" element={<ExamReview/>}></Route>
        <Route exact path="/Examedit/:uuid" element={<Examedit/>}></Route>
        <Route exact path="/Quiz" element={<Quiz/>}></Route>
        <Route exact path="/Quizadd" element={<Quizadd/>}></Route>
        <Route exact path="/Quizedit/:uuid" element={<Quizedit/>}></Route>
        <Route exact path="/Quizview/:uuid" element={<Quizview/>}></Route>
        <Route exact path="/Mocktest" element={<Mocktest/>}></Route>
        <Route exact path="/Mocktestadd" element={<Mocktestadd/>}></Route>
        <Route exact path="/Mocktestedit/:uuid" element={<Mocktestedit/>}></Route>
        <Route exact path="/Mocktestview/:uuid" element={<Mocktestview/>}></Route>
        <Route exact path="/Tournament" element={<Tournament />}></Route>
        <Route exact path="/Tournamentadd" element={<Tournamentadd />}></Route>
        <Route exact path="/Tournamentview/:uuid" element={<Tournamentview />}></Route>
        <Route exact path="/Tournamentedit/:uuid" element={<Tournamentedit />}></Route>
        <Route exact path="/TournamentReview/:tournamentScheduleUUID/:studentUUID" element={<TournamentReview/>}></Route>
      </Routes>
      <Routes>
        <Route exact path="/Question" element={<Question />}></Route>
        <Route exact path="/QuestionAdd" element={<QuestionAdd />}></Route>
        <Route exact path="/QuestionEdit/:uuid" element={<QuestionEdit />}></Route>
        <Route exact path="/QuestionImport" element={<QuestionImport />}></Route>
        <Route exact path="/Questionview/:uuid" element={<Questionview />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/Admin" element={<Admin />}></Route>
        <Route exact path="/Adminview/:uuid" element={<Adminview />}></Route>
        <Route exact path="/Cashfree" element={<Cashfree />}></Route>
        <Route exact path="/payoutrequest" element={<BankTransaction />}></Route>
        <Route exact path="/payoutrequest/:uuid" element={<Payoutrequest />}></Route>

        <Route exact path="/Cashfreereview/:uuid" element={<Cashfreereview />}></Route>
        <Route exact path="/NewAdmin" element={<NewAdmin />}></Route>
        <Route exact path="/Withdraw" element={<Withdraw />}></Route>
        <Route exact path="/UpdateRequest/:uuid" element={<UpdateRequest />}></Route>
        <Route exact path="/Feedback" element={<Feedback />}></Route>
        <Route exact path="/Setting" element={<Setting />}></Route>
        <Route exact path="/Settingadd" element={<Settingadd />}></Route>
        <Route exact path="/Settingedit" element={<Settingedit />}></Route>
        <Route exact path="/Banner" element={<Banner/>}></Route>
      </Routes>
      {/* <ProtectedRoutes/> */}
    </div>
  );
}
export default AdminRouter;