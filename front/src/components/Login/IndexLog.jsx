import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

// gerer quel formulaire apparait selon si l'on est sur "se connecter" ou "s'inscire"

const Login = () => {
  const [signUpModal, setSignUpModal] = useState(true);
  const [signInModal, setSignInModal] = useState(false);


  // détermine si connecter ou s'inscire s'affiche selon navigation client
  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="connexion-page">
      <h2>
        Bienvenue à <br /> <span>Groupomania</span>
      </h2>
      <div className="connectionForm">
        <div className="formContainer">
          <ul>
            <li
              onClick={handleModals}
              id="register"
              className={signUpModal ? "active-btn" : ""}
            >
              S'inscrire
            </li>
            <li
              onClick={handleModals}
              id="login"
              className={signInModal ? "active-btn" : ""}
            >
              Se connecter
            </li>
          </ul>
          {signUpModal && <SignUp />}
          {signInModal && <SignIn />}
        </div>
      </div>
    </div>
  );
};

export default Login;