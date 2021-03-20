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
import * as sessionActions from "../store/reducers/session"
import * as graphActions from "../store/reducers/graphData"
import deadliftIcon from "../images/icons/deadlift-hollow.png"
import chartIcon from "../images/icons/chart3.png"
import deadlift_filled from "../images/icons/deadlift-filled.png"
import bodyIcon from "../images/icons/body.png"
import logoutIcon from "../images/icons/logout.png"
import { CSSTransition } from 'react-transition-group'
import SignUpForm from './auth/SignUpForm';
import planet from "../images/icons/planet.png"

// props.children is where the props will show up (navItems)
// took out {authenticated, isAuthenticated} might need later
const NavBar = (props) => {
  return (
    <nav className="navbar">
      <div className="magic-lifts-heading">
        <Link to="/"><img src={planet} onClick={() => Redirect("/")} className="magic-lifts-logo" alt="home"></img></Link>
        <Link to="/" className="magic-lifts-title">MAGIC LIFTS</Link>
      </div>
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}


const NavItem = (props) => {
  const open = useSelector((x) => (x.session.menu))
  const dispatch = useDispatch()
  const setOpen = (val) => {
    dispatch(sessionActions.toggleMenu(val))
  }

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {!open ? < img className="dropdown_img" src={triangleDownIcon} alt="menu down" /> :
          < img className="dropdown_img" src={triangleUpIcon} alt="menu up" />}
      </a>
      {open && props.children}
    </li>
  )
}

const DropDownMenu = ({ authenticated, setAuthenticated }) => {

  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)
  const [slideReady, setSlideReady] = useState(true)
  const dropdownRef = useRef(null);

  const history = useHistory()

  const user = useSelector((x) => x.session.user)
  const bodyParts = useSelector((x) => Object.values(x.session.user.bodyParts))
  const lifts = useSelector((x) => Object.values(x.currentLifts))
  const open = useSelector((x) => (x.session.menu))

  if (user != null) {

  }


  // logout
  const dispatch = useDispatch();


  const onLogout = async (e) => {
    await logout();
    dispatch(sessionActions.toggleMenu(false))
    setAuthenticated(false);
    dispatch(logoutSessionUser());
    return <Redirect to="/" />
  };

  const goToBodyPart = async (id) => {
    await dispatch(liftActions.setCurrentLifts({ bodyPartId: id }))
  }

  const goToLift = (id) => {

    dispatch(liftActions.setShownLifts({ liftId: id }))
    // dispatch(graphActions.setGraphLifts([id]))
    dispatch(sessionActions.toggleMenu(false))
    history.push("/show-lift")
  }

  const goToCharts = () => {
    dispatch(sessionActions.toggleMenu(false))
    history.push("/chart")
  }

  const createLift = () => {
    dispatch(sessionActions.toggleMenu(false))
    history.push("/create-lift")
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

    function menuItem(event) {
      const target = event.target;
      if (target.className !== 'menu-item' & target.className !== 'dropdownitem_text' & target.className !== 'img-right' & target.className !== 'icon-right' & target.className !== 'dropdown_category') {
        return;
      }
      props.callFunc && props.callFunc()
      props.goToRightMenu && setActiveMenu(props.goToRightMenu)
    }

    return (
      <a className="menu-item" style={{ width: 280 }} onClick={menuItem} >
        {props.leftIcon && <span href="#" onClick={() => props.goToLeftMenu && setActiveMenu(props.goToLeftMenu)} className="icon-button">{props.leftIcon}</span>}
        {props.children}
        {props.rightIcon && <span href="#" className="icon-right">{props.rightIcon}</span>}
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
    //unmountonExit unmounts children if they aren't active
    //timeout sets duration of animation
    <>

      <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
        {authenticated ?
          // ----------------------------- AUTHENTICATED --------------------------
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
                leftIcon={<img src={deadliftIcon} alt="bodyParts" />}
                rightIcon={<img src={triangleRightIcon} className="img-right" alt="more bodyParts" />}
                goToRightMenu="bodyParts"
              ><p className="dropdownitem_text">LIFTS</p>
              </DropDownItem>
              <DropDownItem
                leftIcon={<img src={chartIcon} alt="body" />}
                rightIcon={<img src={triangleRightIcon} className="img-right" alt="charts" />}
                callFunc={goToCharts}
              ><p className="dropdownitem_text">CHART</p>
              </DropDownItem>
              {/* <DropDownItem
                leftIcon={<img src={bodyIcon} alt="body" />}
              ><p className="dropdownitem_text">BODY DIAGRAM</p>
              </DropDownItem> */}
              <DropDownItem
                leftIcon={<img src={logoutIcon} alt="logout" />}
                rightIcon={<img src={triangleRightIcon} className="img-right" alt="logout are you sure?" />}
                goToRightMenu="logout"
              // callFunc={onLogout}
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
                rightIcon={<img src={triangleRightIcon} className="img-right" alt="login" />}
                goToRightMenu="login"
              ><p className="dropdownitem_text">LOG IN</p>
              </DropDownItem>
              <DropDownItem
                leftIcon={<img src={signupIcon} alt="sign up" />}
                rightIcon={<img src={triangleRightIcon} className="img-right" alt="signup" />}
                goToRightMenu="signup"
              ><p className="dropdownitem_text">SIGN UP</p>

              </DropDownItem>
            </div>
          </CSSTransition>
        }


        {/*------------------------------ LOGOUT ------------------------------------------ */}

        <CSSTransition
          in={activeMenu === 'logout'}
          unmountOnExit
          timeout={500}
          classNames="menu-secondary"
          //callback as soon as enter class is added to element
          onEnter={calcDimensions}
        >
          <div className="menu">
            <a className="menu-item" style={{ width: 280 }} onClick={() => setActiveMenu('main')}>
              <img src={triangleLeftIcon} onClick={() => setActiveMenu('main')} className="icon-button" alt="back to main menu" />

              <p className="dropdownitem_text dropdown_category">ARE U SURE?</p>
            </a>
            <DropDownItem
              // leftIcon={<img src={triangleLeftIcon} alt="back to main menu" />}
              goToLeftMenu="main"
            >
              <div className="login-dropdown">
                <LogoutButton
                  setAuthenticated={setAuthenticated} setActiveMenu={setActiveMenu} />
              </div>
            </DropDownItem>
          </div>
        </CSSTransition>


        {/* ----------------------- BODY PARTS -------------------------------- */}

        {user != null &&
          <CSSTransition
            in={activeMenu === 'bodyParts'}
            unmountOnExit
            timeout={500}
            classNames="menu-secondary"
            onEnter={calcDimensions}
          >
            <div className="menu">
              {/* <a className="menu-item" style={{ width: 280 }} onClick={() => createLift()}>
              <img src={triangleLeftIcon} onClick={() => setActiveMenu('main')} className="icon-button" alt="back to main menu" />
            <p className="dropdown_category">CREATE LIFT</p>
              <img src={triangleRightIcon} onClick={() => createLift()} className="icon-right" alt="create-lift" />
            </a> */}
              <DropDownItem
                leftIcon={<img src={triangleLeftIcon} alt="sign up" />}
                callFunc={() => createLift()}
                goToLeftMenu="main"
              >
                {/* <img src={triangleLeftIcon} onClick={() => setActiveMenu('main')} className="icon-button" alt="back to main menu" /> */}
                <p className="dropdown_category">CREATE LIFT</p>
                <img src={triangleRightIcon} onClick={() => createLift()} className="icon-right" alt="create-lift" />
              </DropDownItem>
              {user != null && bodyParts.map((bodyPart) => (
                <>
                  <DropDownItem
                    callFunc={() => goToBodyPart(bodyPart.id)}
                    key={bodyPart.id}
                  ><p className="dropdownitem_text dropdown_category">{bodyPart.title}</p>
                    <div className="line"></div>
                  </DropDownItem>
                  {Object.values(bodyPart.lifts).map((lift) => (
                    <DropDownItem
                      // rightIcon={<img src={triangleRightIcon} alt={`go to ${lift.title}`} />}
                      callFunc={() => goToLift(lift.id)}
                      key={lift.id}
                    ><p className="dropdownitem_text">{lift.title}</p>
                      <img src={triangleRightIcon} onClick={() => goToLift(lift.id)} className="icon-right" alt="go to lift" />
                    </DropDownItem>
                  ))}
                </>
              ))}
            </div>
          </CSSTransition>

        }

        {/* --------------------- LIFTS --------------------------------- */}
        {lifts && <CSSTransition
          in={activeMenu === 'lifts'}
          unmountOnExit
          timeout={500}
          classNames="menu-secondary"
          onEnter={calcDimensions}
        >
          <div className="menu">
            <DropDownItem
              leftIcon={<img src={triangleLeftIcon} alt="back to bodyParts" />}
              goToLeftMenu="bodyParts"
            ><p className="dropdownitem_text"></p>
            </DropDownItem>
            {lifts && lifts.map((lift) => (
              <DropDownItem
                rightIcon={<img src={triangleRightIcon} className="img-right" alt={`go to ${lift.title}`} />}
                callFunc={() => goToLift(lift.id)}
                key={lift.id}
              ><p className="dropdownitem_text">{lift.title}</p>
              </DropDownItem>
            ))}
          </div>
        </CSSTransition>
        }

        {/* --------------------- LOGIN --------------------------------- */}
        <CSSTransition
          in={activeMenu === 'login'}
          unmountOnExit
          timeout={500}
          classNames="menu-secondary"
          onEnter={calcDimensions}
        >
          <div className="menu">
            {/* <DropDownItem
              leftIcon={<img src={triangleLeftIcon} className="back-main" alt="back to main menu" />}
              goToLeftMenu="main"
            ><p className="dropdownitem_text dropdown_category">BACK TO MAIN</p>
            </DropDownItem> */}
            <a className="menu-item" style={{ width: 280 }} onClick={() => setActiveMenu('main')}>
              <img src={triangleLeftIcon} onClick={() => setActiveMenu('main')} className="icon-button" alt="back to main menu" />

              <p className="dropdownitem_text dropdown_category">LOGIN FORM</p>
            </a>
            <DropDownItem
              // leftIcon={<img src={triangleLeftIcon} alt="back to main menu" />}
              goToLeftMenu="main"
            >

              <div className="login-dropdown">
                <LoginForm authenticated={authenticated}
                  setAuthenticated={setAuthenticated} setActiveMenu={setActiveMenu} />
              </div>
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
            <a className="menu-item" style={{ width: 280 }} onClick={() => setActiveMenu('main')}>
              <img src={triangleLeftIcon} onClick={() => setActiveMenu('main')} className="icon-button" alt="back to main menu" />

              <p className="dropdownitem_text dropdown_category">SIGNUP FORM</p>
            </a>
            <DropDownItem
            >
              <SignUpForm authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                setActiveMenu={setActiveMenu}/>
            </DropDownItem>
          </div>
        </CSSTransition>
      </div>
    </>
  )
}

export { NavBar, NavItem, DropDownMenu };
