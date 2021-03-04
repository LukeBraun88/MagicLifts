import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useParams, Redirect, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './auth/LoginForm'
import triangleRightIcon from "../images/icons/triangle-right.png"
import triangleLeftIcon from "../images/icons/triangle-left.png"
import triangleDownIcon from "../images/icons/triangle-down.png"
import triangleUpIcon from "../images/icons/triangle-up.png"
import loginIcon from "../images/icons/login.png"
import signupIcon from "../images/icons/signup.png"

import { logout } from "../services/auth.js";
import { logoutSessionUser } from "../store/reducers/session"
import * as liftActions from "../store/reducers/lifts"

import deadliftIcon from "../images/icons/deadlift-hollow.png"
import deadlift_filled from "../images/icons/deadlift-filled.png"
import bodyIcon from "../images/icons/body.png"
import logoutIcon from "../images/icons/logout.png"
import { CSSTransition } from 'react-transition-group'
import SignUpForm from './auth/SignUpForm';

// props.children is where the props will show up (navItems)
// took out {authenticated, isAuthenticated} might need later
const NavBar = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}


const NavItem = (props) => {

  const [open, setOpen] = useState(false)

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {!open ? < img className="dropdown_img" src={triangleDownIcon} alt="menu down" />:
          < img className="dropdown_img" src={triangleUpIcon} alt="menu up" />}
      </a>
      {open && props.children}
    </li>
  )
}

const DropDownMenu = ({authenticated, setAuthenticated}) => {

  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)
  const dropdownRef = useRef(null);

  const history = useHistory()

  const user = useSelector((x) => x.session.user)
  // const userBodyParts = useSelector((x) => x.session.user.bodyParts)


  // logout
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    // dispatch(logoutSessionUser());
    return <Redirect to="/" />
  };

  const goToBodyPart = (lift) => {
    // dispatch(liftActions.setCurrentLift(lift))
    // alert(lift)
    // dispatch(liftActions.setCurrentLiftsCreator(lift))
    // then history.push to page that displays current lift
  }

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcDimensions(el) {
    //can use offsetHeight propert because contains height of el for smoother transition
    const height = el.offsetHeight;
    setMenuHeight(height)
  }

  const DropDownItem = (props) => {
    return (
      <a href="#" className="menu-item" style={{width: 280}} >
        {props.leftIcon && <span onClick={()=> props.goToLeftMenu && setActiveMenu(props.goToLeftMenu)} className="icon-button">{props.leftIcon}</span>}
        {props.children}
        {props.rightIcon && <span onClick={() =>{ props.goToRightMenu && setActiveMenu(props.goToRightMenu); props.callFunc && props.callFunc()}}className="icon-right">{props.rightIcon}</span>}
      </a>
    )
  }

  // const DropDownItemRegister = (props) => {
  //   return (
  //     <a href="#" className="menu-item" style={{width: 280}} onClick={history.push("/sign-up")}>
  //       {props.leftIcon && <span className="icon-button">{props.leftIcon}</span>}
  //       {props.children}
  //       {props.rightIcon && <span className="icon-right">{props.rightIcon}</span>}
  //     </a>
  //   )
  // }



  //if authenticated:
  return (
    //css transition adds or removes classes based on state
    //when in is truthy, shows children. else changes css classes
    //unmountonExi unmounts children if they aren't active
    //timeout sets duration of animation

    <div className="dropdown" style={{height: menuHeight}} ref={dropdownRef}>
        {authenticated ?
// ----------------------------- AUTHENTICATED --------------------------
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        //callback as soon as enter class is added to element
        onEnter={calcDimensions}
        // onExit={calcDimensions}
        >
          <div className="menu">
        <DropDownItem
          leftIcon={<img src={deadliftIcon} alt="lifts" />}
          rightIcon={<img src={triangleRightIcon} alt="more lifts" />}
          goToRightMenu="lifts"
        ><p className="dropdownitem_text">LIFTS</p>
      </DropDownItem>
        <DropDownItem
          leftIcon={<img src={bodyIcon} alt="body" />}
          ><p className="dropdownitem_text">BODY DIAGRAM</p>
      </DropDownItem>
        <DropDownItem
          leftIcon={<img src={logoutIcon} alt="logout" />}
              rightIcon={<img src={triangleRightIcon} alt="logout are you sure?" />}
              goToRightMenu="main"
              callFunc={onLogout}
          ><p className="dropdownitem_text">LOGOUT</p>
      </DropDownItem>
        </div>
      </CSSTransition>
      :
// ------------------------- UN-AUTHENTICATED ----------------------------
        <CSSTransition
          in={activeMenu === 'main'}
          unmountOnExit
          timeout={500}
          classNames="menu-primary"
          //callback as soon as enter class is added to element
          onEnter={calcDimensions}
        >
          <div className="menu">
            <DropDownItem
              leftIcon={<img src={loginIcon} alt="log in" />}
              rightIcon={<img src={triangleRightIcon} alt="login" />}
              goToRightMenu="login"
            ><Link to="/login" className="dropdownitem_text">LOG IN</Link>
            </DropDownItem>
            <DropDownItem
              leftIcon={<img src={signupIcon} alt="sign up"/>}
              rightIcon={<img src={triangleRightIcon} alt="signup" />}
              goToRightMenu="signup"
            ><Link to="/sign-up" className="dropdownitem_text">SIGN UP</Link>

            </DropDownItem>
          </div>
        </CSSTransition>
        }
{/* ----------------------- LIFTS -------------------------------- */}
      <CSSTransition
        in={activeMenu === 'lifts'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcDimensions}
        >
          <div className="menu">
        <DropDownItem
          leftIcon={<img src={triangleLeftIcon} alt="back to main menu" />}
        // rightIcon={<img src={triangleRightIcon} alt="more lifts"/>}
            goToLeftMenu="main"
          ><p className="dropdownitem_text"></p>
      </DropDownItem>
      {/* add showing categories. possibly have a state change when you create a new lift */}
          {/* {userBodyParts.map((bodyPart) => (
            <DropDownItem
              rightIcon={<img src={triangleRightIcon} alt={`go to ${bodyPart.title}`} />}
              callFunc={()=>goToBodyPart(bodyPart)}
            ><p className="dropdownitem_text">{bodyPart.title}</p>
            </DropDownItem>
          ))} */}
        </div>
      </CSSTransition>
{/* --------------------- LOGIN --------------------------------- */}
      <CSSTransition
        in={activeMenu === 'login'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcDimensions}
        >
          <div className="menu">
        <DropDownItem
          leftIcon={<img src={triangleLeftIcon} alt="back to main menu" />}
          goToLeftMenu="main"
          >

            <LoginForm authenticated={authenticated}
              setAuthenticated={setAuthenticated}/>
      </DropDownItem>
        </div>
      </CSSTransition>
{/* -------------------------- LOGOUT -------------------------- */}
      {/* <CSSTransition
        in={activeMenu === 'logout'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcDimensions}
        >
          <div className="menu">
        <DropDownItem
          leftIcon={<img src={triangleLeftIcon} alt="back to main menu" />}
            // rightIcon={<img src={triangleRightIcon} alt="more lifts" />}
          goToLeftMenu="main"
          >
            <LogoutButton setAuthenticated={setAuthenticated}/>
      </DropDownItem>
        </div>
      </CSSTransition> */}

{/* ---------------- SIGNUP ----------------------- */}
      <CSSTransition
        in={activeMenu === 'signup'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcDimensions}
        >
          <div className="menu">
        <DropDownItem
          leftIcon={<img src={triangleLeftIcon} alt="back to main menu" />}
            goToLeftMenu="main"
          >
            <SignUpForm authenticated={authenticated}
              setAuthenticated={setAuthenticated}/>
      </DropDownItem>
        </div>
      </CSSTransition>
    </div>
  )
}

export { NavBar, NavItem, DropDownMenu };
