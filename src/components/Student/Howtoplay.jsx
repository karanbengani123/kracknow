import React from "react";
import "../CssFile/Student.css";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import AnimatedText from 'react-animated-text-content';

function Howtoplay() {
  return (
    <>
      <Header />
      <div className="content-wrapper admin-body">
        <section className="content">
          <div className="container-fluid">
            <div className="page-content">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0">How to Play</h4>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      {/* <AnimatedText
                      className="animated"
                        type="words"
                        interval={0.04}
                        duration={0.8}
                        animation={{
                          y: "100px",
                          ease: "ease",
                        }}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolores quaerat ad nisi natus cupiditate. Aliquam, tempora dolorem? Quo fugiat totam minima reprehenderit iste obcaecati vero! Consequuntur vel deserunt magni!
                      </AnimatedText> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <SideNav />
      <Footer />
    </>
  );
}
export default Howtoplay;





// import ReCAPTCHA from "react-google-recaptcha";
// import React, { useState, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useHistory } from "react-router-dom";
// import { createUser } from "../../api/authentication/register";
// import "../../styles/app.scss";

// const Signup = () => {
//   // return signup page
//   const [passwordShown, setPasswordShown] = useState(false);
//   const [resetPasswordShown, setresetPasswordShown] = useState(false);
//   const [loginrole, setLoginRole] = useState();
//   const [captchaverify, setCaptchaverify] = useState(false);
//   const [password, setPassword] = useState();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const history = useHistory();
//   const formRef = useRef();
//   let btnRef = useRef();
//   const passwordOne = register("passwordone", {
//     required: "Please Fill The Password",
//     minLength: {
//       value: 6,
//       message: "Password must have at least 6 characters",
//     },
//   });
//   var count = 0;

//   const togglePassword = (e) => {
//     // toggle the password view to hide or show
//     setPasswordShown(!passwordShown);
//     e.preventDefault();
//   };

//   const resetTogglePassword = (e) => {
//     setresetPasswordShown(!resetPasswordShown);
//     e.preventDefault();
//   };

//   const resetPasswordField = (event) => {
//     passwordOne.onChange(event);
//     setPassword(event.currentTarget.value);
//     document.getElementsByClassName("resetfield")[0].style.cssText =
//       "display:block";
//   };
//   const changebgtxt = (event) => {
//     // this function is used for change bg and txt of role type of login page
//     count += 1;
//     if (count === 1) {
//       const defaultrole = document.getElementsByClassName("defaultrole")[0];
//       defaultrole.nextSibling.style.cssText = "";
//       defaultrole.parentNode.style.cssText = "";
//     }
//     if (event.target.nodeName === "INPUT") {
//       let background;
//       if (event.target.value === "client") background = event.target.parentNode;
//       else background = event.currentTarget.children[0];
//       background.style.cssText = "background-color:#3F9AE0";
//       event.target.nextSibling.style.cssText = "color:#FFFFFF";
//       setLoginRole({ bg: background, txt: event.target.nextSibling });
//     } else if (event.target.nodeName === "SPAN") {
//       event.target.children[0].checked = true;
//       event.target.style.cssText = "background-color:#3F9AE0";
//       event.target.children[1].style.cssText = "color:#FFFFFF";
//       setLoginRole({ bg: event.target, txt: event.target.children[1] });
//     } else if (event.target.nodeName === "LABEL") {
//       event.target.previousSibling.checked = true;
//       event.target.parentNode.style.cssText = "background-color:#3F9AE0";
//       event.target.style.cssText = "color:#FFFFFF";
//       setLoginRole({ bg: event.target.parentNode, txt: event.target });
//     }
//     if (loginrole) {
//       loginrole.bg.style.cssText = "";
//       loginrole.txt.style.cssText = "";
//     }
//   };

//   const selectdefaultrole = (event) => {
//     const defaultrole = document.getElementsByClassName("defaultrole")[0];
//     defaultrole.checked = true;
//     defaultrole.nextSibling.style.cssText = "color:#FFFFFF";
//     defaultrole.parentNode.style.cssText = "background-color:#3F9AE0";
//   };

//   async function submitUser(event) {
//     // submit form for user creation if all validation meet requirement
//     if(btnRef.current){
//       btnRef.current.setAttribute("disabled", "disabled");
//     }
//     const form = formRef.current;
//     let role = form.opt.value.toUpperCase();
//     role = role === "FREELANCE" ? "FREELANCE_RECRUITER" : role;
//     const signupval = {
//       firstName: event.firstname.replace(/ /g, ""),
//       lastName: event.lastname.replace(/ /g, ""),
//       role: role,
//       email: event.email,
//       password: event.passwordone,
//     };
//     if (!captchaverify) {
//       btnRef.current.removeAttribute("disabled");
//       document.getElementsByClassName("captchaermsg")[0].style.display =
//         "inline-block";
//       return;
//     }
//     const response = await createUser(signupval);
//     const status = response.status;
//     if (status === 201) history.push("/user/register");
//     if (status === 400) {
//       btnRef.current.removeAttribute("disabled");
//       const msg = await response.json();
//       const cmsg = document.getElementsByClassName("captchaermsg")[0];
//       cmsg.innerText = msg.message;
//       cmsg.style.display = "inline-block";
//     }
//     if (status === 422) {
//       btnRef.current.removeAttribute("disabled");
//       const msg = await response.json();
//       try {
//         const cmsg = document.getElementsByClassName("captchaermsg")[0];
//         cmsg.innerText = msg.payload.password.message;
//         cmsg.style.display = "none";
//       } catch {}
//     }
//   }

//   return (
//     <div
//       className="main-container"
//       style={{ height: "100vh" }}
//       onLoad={selectdefaultrole}
//     >
//       <div className="col-md-12 h-100">
//         <div className="row h-100">
//           <div className="col-md-7" style={{ background: "#F7F7F7" }}>
//             <div className="row pt-5 mt-4">
//               <div className="col-md pt-5 pb-5 mt-5">
//                 <img
//                   src="../../../icon/common/mainlogo.png"
//                   className="img-fluid mx-auto d-block pt-5 pb-5 mt-5"
//                   alt="dollar"
//                 />
//               </div>
//             </div>
//           </div>
//           <div
//             className="col-md-5"
//             style={{ background: "#F7F7F7", fontFamily: "Mulish" }}
//           >
//             <div className="row mx-5 pt-2">
//               <div className="col-md">
//                 <label
//                   style={{
//                     fontWeight: "bold",
//                     fontSize: "28px",
//                     color: "#11142D",
//                   }}
//                 >
//                   Create your account
//                 </label>
//               </div>
//             </div>
//             <form
//               className="form-group"
//               onSubmit={handleSubmit(submitUser)}
//               ref={formRef}
//             >
//               <div className="row pt-1 pl-1 signupcontent">
//                 <div className="col-xl-2">
//                   <label
//                     style={{
//                       fontWeight: "600",
//                       fontSize: "26px",
//                       color: "#000000",
//                     }}
//                   >
//                     I am a
//                   </label>
//                 </div>
//                 <div
//                   className="col-xl-4 radiowrapper1 signupcontentchild"
//                   onClick={changebgtxt}
//                 >
//                   <span className="p-2 form-inline roletype" id="span1">
//                     <input
//                       type="radio"
//                       className="loginradio defaultrole"
//                       id="customtadio"
//                       value="candidate"
//                       name="opt"
//                     />
//                     <label
//                       className="radiotext"
//                       htmlFor="customRadio"
//                       onClick={changebgtxt}
//                     >
//                       Candidate
//                     </label>
//                   </span>
//                 </div>
//                 <div
//                   className="col-xl-4 signupcontentchild"
//                   onClick={changebgtxt}
//                 >
//                   <div className={"signupclient"}>
//                     <span className="p-2  form-inline roletype">
//                       <input
//                         type="radio"
//                         className="loginradio"
//                         id="customtadio0"
//                         value="client"
//                         name="opt"
//                       />
//                       <label
//                         className="radiotext"
//                         htmlFor="customRadio0"
//                         onClick={changebgtxt}
//                       >
//                         Client
//                       </label>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="row pt-2 pl-5 ml-5 pb-3">
//                 <div
//                   className="col-xl-4 radiowrapper signupcontent"
//                   onClick={changebgtxt}
//                 >
//                   <span className="p-2 form-inline roletype">
//                     <input
//                       type="radio"
//                       className="loginradio"
//                       id="customtadio1"
//                       value="recruiter"
//                       name="opt"
//                     />
//                     <label
//                       className="radiotext"
//                       htmlFor="customRadio1"
//                       onClick={changebgtxt}
//                     >
//                       Recruiter
//                     </label>
//                   </span>
//                 </div>
//                 <div
//                   className="col-xl-5 radiowrapper signupcontent"
//                   onClick={changebgtxt}
//                 >
//                   <span className="p-2 form-inline roletype freelance">
//                     <input
//                       type="radio"
//                       className="loginradio"
//                       id="customtadio2"
//                       value="freelance"
//                       name="opt"
//                     />
//                     <label
//                       className="radiotext recruiter"
//                       htmlFor="customRadio2"
//                       onClick={changebgtxt}
//                     >
//                       Freelance Recruiter
//                     </label>
//                   </span>
//                 </div>
//               </div>
//               <div className="row pl-4">
//                 <div className="col-xl-5 pt-3 namewrapper">
//                   <input
//                     type={"text"}
//                     placeholder={"First Name"}
//                     {...register("firstname", {
//                       required: {
//                         value: true,
//                         message: "Please Fill the First Name",
//                       },
//                       pattern: {
//                         value: /^(?! )[A-Za-z\s]*$/,
//                         message: "First Name Is Invalid",
//                       },
//                     })}
//                     className={"form-control signupforminputfield shadow-none"}
//                     name={"firstname"}
//                   />
//                   {errors.firstname && (
//                     <font
//                       className={"dashboardforminputtext text-danger"}
//                       style={{ fontWeight: "600" }}
//                     >
//                       {errors.firstname.message}
//                     </font>
//                   )}
//                 </div>
//                 <div className="col-xl-5 pr-5 pt-3">
//                   <input
//                     type={"text"}
//                     placeholder={"Last Name"}
//                     {...register("lastname", {
//                       pattern: {
//                         value:/^(?! )[A-Za-z\s]*$/,
//                         message: "Last Name Is Invalid",
//                       },
//                       required: {
//                         value: true,
//                         message: "Please Fill The Last Name",
//                       },
//                     })}
//                     className={"form-control signupforminputfield shadow-none"}
//                     name={"lastname"}
//                   />
//                   {errors.lastname && (
//                     <font
//                       className={"dashboardforminputtext text-danger"}
//                       style={{ fontWeight: "600" }}
//                     >
//                       {errors.lastname.message}
//                     </font>
//                   )}
//                 </div>
//               </div>
//               <div className="row pl-4 pt-2">
//                 <div className="col-xl-10 pr-5">
//                   <input
//                     type={"email"}
//                     placeholder={"Email ID"}
//                     id={"email"}
//                     {...register("email", {
//                       required: {
//                         value: true,
//                         message: "Please Fill The Email",
//                       },
//                       pattern: {
//                         value:
//                           /^([a-zA-Z0-9+_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
//                         message: "Email Is Invalid",
//                       },
//                     })}
//                     className={"form-control signupforminputfield shadow-none"}
//                     name={"email"}
//                   />
//                   {errors.email && (
//                     <font
//                       className={"dashboardforminputtext text-danger"}
//                       style={{ fontWeight: "600" }}
//                     >
//                       {errors.email.message}
//                     </font>
//                   )}
//                 </div>
//               </div>
//               <div className="row pl-4 pt-2">
//                 <div className="col-xl-10 pr-5">
//                   <div>
//                     <i
//                       className={
//                         passwordShown ? "fas fa-eye-slash" : "fa fa-eye"
//                       }
//                       onClick={togglePassword}
//                       style={{
//                         position: "absolute",
//                         right: "60px",
//                         top: "20px",
//                         color: "#DADADA",
//                         fontSize: "20px",
//                         cursor: "pointer",
//                       }}
//                     />
//                     <input
//                       type={passwordShown ? "text" : "password"}
//                       placeholder={"Password"}
//                       id={"password"}
//                       {...passwordOne}
//                       className={
//                         "form-control signupforminputfield shadow-none pr-5"
//                       }
//                       onChange={resetPasswordField}
//                     />
//                     {errors.passwordone && (
//                       <font
//                         className={"dashboardforminputtext text-danger"}
//                         style={{ fontWeight: "600" }}
//                       >
//                         {errors.passwordone.message}
//                       </font>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className="row pl-4 pt-2 resetfield"
//                 style={{ display: "none" }}
//               >
//                 <div className="col-xl-10 pr-5">
//                   <div>
//                     <i
//                       className={
//                         resetPasswordShown ? "fas fa-eye-slash" : "fa fa-eye"
//                       }
//                       onClick={resetTogglePassword}
//                       style={{
//                         position: "absolute",
//                         right: "60px",
//                         top: "20px",
//                         color: "#DADADA",
//                         fontSize: "20px",
//                         cursor: "pointer",
//                       }}
//                     />
//                     <input
//                       type={resetPasswordShown ? "text" : "password"}
//                       placeholder={"ReEnter Password"}
//                       id={"password1"}
//                       {...register("passwordtwo", {
//                         required: "Please Fill The Password",
//                         minLength: {
//                           value: 6,
//                           message: "Password must have at least 6 characters",
//                         },
//                         validate: (value) =>
//                           value === password || "Password Not Match",
//                       })}
//                       className={
//                         "form-control signupforminputfield shadow-none pr-5"
//                       }
//                     />
//                     {errors.passwordtwo && (
//                       <font
//                         className={"dashboardforminputtext text-danger"}
//                         style={{ fontWeight: "600" }}
//                       >
//                         {errors.passwordtwo.message}
//                       </font>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <font
//                 className={"pl-4 errormsg confirmpassworderrmsg"}
//                 id={""}
//                 style={{ display: "none" }}
//               >
//                 Password not match
//               </font>
//               <div className="row pl-4 pt-3 pb-0">
//                 <div className="col-xl form-inline">
//                   <input
//                     type="checkbox"
//                     className="signcheck ml-1"
//                     id="customCheck"
//                     name="condition"
//                     {...register("condition", {
//                       required: {
//                         value: true,
//                         message: "Please Accept The Agreement",
//                       },
//                     })}
//                   />
//                   <label
//                     className="ml-2"
//                     htmlFor="customCheck"
//                     style={{
//                       fontSize: "14px",
//                       color: "#9A9AB0",
//                       fontWeight: "normal",
//                     }}
//                   >
//                     I have read and agree to the Terms of Service
//                   </label>
//                 </div>
//               </div>
//               {errors.condition && (
//                 <font
//                   className={"dashboardforminputtext text-danger ml-4"}
//                   style={{ fontWeight: "600" }}
//                 >
//                   {errors.condition.message}
//                 </font>
//               )}
//               <div className="row pl-3 pr-5 pt-2">
//                 <div className="col-xl-10">
//                   <div className={"recaptcha-wrap"}>
//                     <div id={"g-recaptcha"}>
//                       <ReCAPTCHA
//                         sitekey="6LfipUAdAAAAAAGDRiUZYVUMEzVhUgZJMYGxXQhA"
//                         onChange={() => setCaptchaverify(true)}
//                       />
//                     </div>
//                   </div>
//                   <font
//                     color="red"
//                     className={"px-2 captchaermsg"}
//                     style={{ display: "none" }}
//                   >
//                     Invalid Captcha
//                   </font>
//                 </div>
//               </div>
//               <div className="row pl-3 pr-5">
//                 <div className="col-xl-10">
//                   <button
//                     ref={btnRef}
//                     type={"submit"}
//                     className={"btn signbtn"}
//                     id={"divbtndiv"}
//                     onClick={handleSubmit(submitUser)}
//                   >
//                     Register
//                   </button>
//                 </div>
//               </div>
//               <div className="row mx-5 pb-0 pt-3">
//                 <div className=" pl-5">
//                   <div
//                     className={"pl-5"}
//                     style={{
//                       fontWeight: "normal",
//                       fontSize: "16px",
//                       color: "#9A9AB0",
//                     }}
//                   >
//                     Have an account?
//                   </div>
//                 </div>
//                 <div className=" pl-0">
//                   <div className={"pl-2"}>
//                     <Link
//                       to={"/user/login"}
//                       style={{
//                         textDecoration: "none",
//                         color: "#2E2E2E",
//                         fontWeight: "bold",
//                         fontSize: "16px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       {" "}
//                       Sign In Now
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(Signup);
