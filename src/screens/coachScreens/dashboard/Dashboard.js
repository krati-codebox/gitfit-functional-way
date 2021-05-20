import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import { concat, times, _ } from "lodash";
import $ from "jquery";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import SecureLS from "secure-ls";
import Swal from "sweetalert2";
import Tour from "reactour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Websocket from "react-websocket";
import Loader from "react-loader-spinner";

import { ApiBaseUrl, Api, Notification } from "../../../utils";
import images from "../../../assets/images";


const ls = new SecureLS();

export const DashboardComponent = () => {
  const [athlete, setAthlete] = useState([]);
  const [demoathId, setDemoathId] = useState("");
  const [addText, setAddText] = useState("");
  const [athlete_id, setAthlete_id] = useState("");
  const [commentValue, setCommentValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [coachCount, setCoachCount] = useState(0);
  const [athleteCount, setAthleteCount] = useState(0);
  const [count, setCount] = useState(0);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);
  const [show, setShow] = useState(true);
  const [item, setItem] = useState("");

  let history = useHistory();

//   useEffect(()=>{

//   })

  useEffect(()=> {
    // myProfile();
    // window.addEventListener("keyup", this.keyHandling);
    // this.openTour();
    // if (this.state.athlete_id !== "") {
    //   this.commentsDataApi();
    // }
    // if (ls.get("is_logged_in") === true) {
    //   this.addNotification();
    //   ls.set("is_logged_in", false);
    // }
    getAthletes();
    // if (ls.get("is_changepassword") === true) {
    //   this.addNotificationChangePassword();
    //   ls.set("is_changepassword", false);
    // }

    // if (ls.get("is_invite_athelete") === true) {
    //   this.addNotificationInviteAthelete();
    //   ls.set("is_invite_athelete", false);
    // }
  },[])

  //   const alert = () => {
  //     if (
  //       this.props.location &&
  //       this.props.location.state &&
  //       this.props.location.state.item
  //     ) {
  //       return (this.item =
  //         this.props.location &&
  //         this.props.location.state &&
  //         this.props.location.state.item);
  //     } else if (
  //       this.props.location &&
  //       this.props.location.state &&
  //       this.props.location.state.data &&
  //       this.props.location.state.data.gitfit_subscription
  //     ) {
  //       return (this.item =
  //         this.props.location &&
  //         this.props.location.state &&
  //         this.props.location.state.data &&
  //         this.props.location.state.data.gitfit_subscription);
  //     } else {
  //       return null;
  //     }
  //   };

  // const athlete = () => {
  //     if (this.item.id === 1) {
  //         return (
  //             <p className="d-inline-block">
  //                 Enjoy FREE access of Gitfit up to 3 athletes. Get Fit!
  //             </p>
  //         );
  //     } else if (this.item.id === 2) {
  //         return (
  //             <p className="d-inline-block">
  //                 Enjoy access of Gitfit up to 25 athletes. Get Fit!
  //             </p>
  //         );
  //     } else if (this.item.id === 3) {
  //         return (
  //             <p className="d-inline-block">
  //                 Enjoy access of Gitfit up to 75 athletes. Get Fit!
  //             </p>
  //         );
  //     }
  // };

  //   const showNotification = () => {
  //     if (this.state.show) {
  //       if (this.item) {
  //         return (
  //           <div
  //             class="alert alert-success alert-dismissible show alertcss"
  //             role="alert"
  //           >
  //             Hey, Congratulations !! You have chosen{" "}
  //             <strong>{this.item.subscription_name}</strong> Plan.{" "}
  //             {this.athlete()}
  //             <button
  //               type="button"
  //               class="close"
  //               data-dismiss="alert"
  //               aria-label="Close"
  //             >
  //               <span aria-hidden="true">&times;</span>
  //             </button>
  //           </div>
  //         );
  //       }
  //     }
  //   };

  const getAthletes = () => {
    let token = ls.get("auth_token");

    if (token !== null) {
      axios
        .get(`${ApiBaseUrl}api/athletes/?is_coach_dashboard=true`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          if (res.status_code === 400) {
            // Notification(
            //   this.notificationDOMRef,
            //   "Error",
            //   res.message,
            //   "danger"
            // );
            Notification("Error ", res.message, "danger");
          } else if (res.status === 200) {
            if (res && res.data[0]) {
              //   this.setState({
              //     atheletes: res.data,
              //     demoathId: res.data[0].athlete_id,
              //     loading: false,
              //   });
              setAthlete(res.data);
              setDemoathId(res.data[0].athlete_id);
              setLoading(false);
            } else {
              //   this.setState({
              //     atheletes: [],
              //     loading: false,
              //   });
              setAthlete([]);
              setLoading(false);
            }
          }
        })
        .catch((error) => {
          //   Notification(
          //     this.notificationDOMRef,
          //     "Error",
          //     error.message,
          //     "danger"
          //   );
          Notification("Error ", error.message, "danger");
        });
    } else {
        history.push("/");
    }
  };

  return <div>Hello</div>;

//   <Tour
//   onRequestClose={this.closeTour}
//   closeWithMask={false}
//   steps={this.tourConfig}
//   isOpen={isTourOpen}
//   maskClassName="mask"
//   className="helper"
//   rounded={10}
//   accentColor={accentColor}
//   onAfterOpen={this.disableBody}
//   onBeforeClose={this.enableBody}
//   lastStepNextButton={
//     <button
//       onClick={() => {
//         this.props.history.push(
//           `/coach/athlete-information/${this.state.demoathId}`
//         );
//       }}
//       style={{
//         color: "#fff",
//         "background-color": "#5cb85c",
//         "border-color": "#4cae4c",
//         display: "inline-block",
//         "margin-bottom": "0",
//         "font-weight": "400",
//         cursor: "pointer",
//         border: "1px solid transparent",
//         padding: "7px 7px",
//         "font-size": "13px",
//         "border-radius": "4px",
//       }}
//     >
//       Let's see an Athlete Dashboard!
//     </button>
//   }
// />
// )}
// <Websocket
// url={`${SocketUrl}api/notifications?token=${ls.get("auth_token")}`}
// onMessage={this.handleData.bind(this)}
// />
// <div className="container-fluid nopadd">
// <div className="col-md-2 nopadd mob_test_none">
//   <SideBar />
// </div>

// <div className="col-md-12 nopadd athelete_box menusideboxout">
//   {this.showNotification()}
//   <div className="col-xs-6 athe_text">
//     <h2 style={{ margin: "0px" }}> Athletes</h2>
//   </div>
//   <div className="col-xs-6 text-right athelet_form">
//     <form onSubmit={this.handleSearch}>
//       <div style={{ margin: "20px" }} id="custom-search-input">
//         <div className="input-group">
//           <input
//             type="search"
//             name="q"
//             value={this.state.searchString}
//             className="form-control input-lg"
//             ref="search"
//             maxLength={255}
//             onChange={this.handleChange}
//             id="athlete-search-bar"
//             data-tut="reactour__search"
//           />

//           <span className="input-group-btn">
//             <button
//               className="btn btn-info btn-lg"
//               id="athlete-submit-button"
//               type="submit"
//             >
//               <i className="glyphicon glyphicon-search" />
//             </button>
//           </span>
//         </div>
//       </div>
//     </form>
//   </div>
//   <div className="clearfix" />
//   {_atheletesList.length === 0 ? (
//     <div className="col-sm-12 col-xs-12 user_detail">
//       <p class="p_nocontent">No results found! </p>
//     </div>

//  athlete.map((athlete, index) => {
//     return (
//       <div key={index} className="athelete_info nopadd">
//         <div className="col-md-6 ">
//           <div
//             className="panel_content atheleteinnercontainer"
//             id="{'athelete_comment_id_' + index}"
//             data-tut="reactour__copy"
//           >
//             <div className="col-sm-2 col-xs-2 athe_user">
//               {/* {this.imageData(athlete.avatar, athlete.name)} */}
//             </div>
//             <div className="col-sm-5 col-xs-5 nopadd user_detail">
//               <h4>
//                 <a
//                   className="athlete"
//                 //   onClick={this.redirectToMyInfo}
//                   id={athlete.athlete_id}
//                 >
//                   {athlete.name
//                     .toLowerCase()
//                     .split(" ")
//                     .map(
//                       (s) =>
//                         s.charAt(0).toUpperCase() + s.substring(1)
//                     )
//                     .join(" ")}
//                 </a>
//               </h4>

//               <h5>
//                 Next Scheduled Meeting is at:
//                 <br />
//                 {athlete.schedule_meeting !== null
//                   ? moment(athlete.schedule_meeting).format(
//                     "MM-DD-YYYY | hh:mm a"
//                   )
//                   : "N/A"}
//               </h5>
//               <p>Latest Nutrition : --</p>
//             </div>
//             <div className="col-sm-5 col-xs-5 userrightpanel">
//               <ul className="athelet_list">
//                 {athlete_id !== athlete.athlete_id ? (
//                   <>
//                     <li
//                       className="fa_fa_none editbtn"
//                       id={"editbtnId" + index}
//                     //   onClick={() =>
//                     //     this.appendClass(index, athlete.athlete_id)
//                     //   }
//                       data-tip={"Messaging"}
//                     >
//                       <i
//                         className="fa fa-envelope"
//                         aria-hidden="true"
//                         data-tut="reactour__msg"
//                       />
//                       {athlete.messages > 0 && (
//                         <span className="badge msgcount">
//                           {athlete.messages}
//                         </span>
//                       )}
//                     </li>
//                     <li>
//                       <img
//                         className="deletecoachimg"
//                         // onClick={() =>
//                         //   this.deleteAthlete(athlete.athlete_id)
//                         // }
//                         data-tip={"Delete"}
//                         src={images.delete_psw}
//                       ></img>
//                     </li>
//                   </>
//                 ) : (
//                   <li
//                     className="fa_fa_none closebtn"
//                     // onClick={() => this.removeClass(index)}
//                   >
//                     <i className="fa fa-times" aria-hidden="true" />
//                   </li>
//                 )}
//               </ul>
//               <p className="text-right lbs"> Lbs </p>
//             </div>
//             <div className="clearfix" />
//             <div className="col-md-12 nopadd">
//               <ul className="protien_list text-center">
//                 <li>
//                   Protein (g) <span> {athlete.protein} </span>{" "}
//                 </li>
//                 <li>
//                   Carbs (g) <span> {athlete.carbs} </span>{" "}
//                 </li>
//                 <li>
//                   Fat (g) <span> {athlete.fat}</span>{" "}
//                 </li>
//                 <li>
//                   Calories <span> {athlete.calories}</span>{" "}
//                 </li>
//                 <li>
//                   Water (Cups) <span> {athlete.water}</span>{" "}
//                 </li>
//               </ul>
//             </div>
//             <div className="clearfix" />

//             <form
//               className="athelete_comment"
//               id={"athelete_comment_id_" + index}
//             //   onSubmit={this.commentSubmit}
//             >
//               {/* <Communication
//                 commentsData={this.state.commentValue}
//                 messageSend={this.state.commentPostApi}
//                 addText={this.state.addText}
//                 addTextChange={this.commentChange}
//               /> */}
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   })
};
