import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginInfo } from "../../../interfaces/types";
import useUserStore from "../../../hooks/UserStoreHook";
import styles from "./loginForm.module.css";
import logo from '../../../assets/img/logo.png';

const LoginForm = () => {
  const {
    register,
    formState: { errors, isSubmitSuccessful},
    handleSubmit,
    reset
  } = useForm<LoginInfo>();
  const { authLogin, loginData, error } = useUserStore();

  const onSubmit: SubmitHandler<LoginInfo> = (data) => authLogin(data);

  React.useEffect(() => {
    reset({
        email: "",
        password: ""
    })
  }, [isSubmitSuccessful, reset])

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <img src={logo} alt="login"/>
        </div>
      <div className={styles.responseMessage}>
        {error && loginData.message ? (
          <span className={styles.ops}>Ops!, {loginData.message}</span>
        ) : !error && loginData.token && <span className={styles.success}>You're Logged</span>}
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className={styles.error}>Email is required</span>}
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <span className={styles.error}>Password is required</span>}
        </div>
        <div className={styles.formGroup}>
          <input className={styles.button} type="submit" value="Login"/>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
