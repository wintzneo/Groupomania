import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import * as yup from "yup";

// Schema YUP
const schema = yup.object({
  email: yup.string().email("Email invalide").required("Ce champ est requis"),
  password: yup
    .string()
    .min(8, "Pas d'espace, longueur entre 8 et 20 caractères, minimum 1 chiffre, 1 minuscule et 1 majuscule")
    .max(20, "Le mot de passe ne doit pas faire plus de 20 caractères"),
});


const SignUp = () => {
  const [inscrit, setInscrit] = useState(false);
  const [errorCo, setErrorCo] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });


  // connect with backend
  const handleSignUp = useCallback( async (data) => {
    try {
      await axios.post("http://localhost:4200/api/users/signup", data);
      setInscrit(true)
      setErrorCo(false)
    } catch (error) {
      if(error.message === "Request failed with status code 500") {
        setInscrit(false)
        setErrorCo(true)
      }
    }
  },[]);


  

  return (
    <form onSubmit={handleSubmit(handleSignUp)} id="sign-form">
      {errorCo && <div className="error">Email ou mot de passe déjà utilisé</div>}
      {inscrit && <div className="alert-success">Vous êtes bien inscrit.<br/> Veuillez vous connecter<br /></div>}
      <label htmlFor="email">Email </label>
      <br />
      <input {...register("email")} />
      <br />
      {errors.email && <div className="error">{errors.email.message}</div>}
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input {...register("password")} type='password' />
      <br />
      {errors.password && <div className="error">{errors.password.message}</div>}
      <br />
      <input
        type="submit"
        id="button"
        value="S'inscrire"
      />
    </form>
  );
};

export default SignUp;