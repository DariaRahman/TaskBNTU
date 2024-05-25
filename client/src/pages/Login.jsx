import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import Loading from "../components/Loader";
import { toast } from "sonner";
import logo from "../assets/images/logo.png";
import photo from "../assets/images/photo.jpg";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();

      dispatch(setCredentials(result));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full lg:w-1/2 p-4 md:p-1 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14 rounded-lg shadow-lg"
        >
          <div className="flex flex-col items-center">
          <div className="w-20 h-20 mb-4">
              <img src={logo} alt="logo" className="w-full h-auto" />
            </div>
            <span className="text-center text-gray-600 text-sm md:text-base mb-2 border border-gray-300 rounded-lg px-3 py-1">
              Управление учебным процессом – легко и эффективно
            </span>
            <div className="text-green-600 text-2xl font-bold text-center mb-6">
              Добро пожаловать!
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <Textbox
              placeholder="email@example.com"
              type="email"
              name="email"
              label="Почта"
              className="w-full rounded-full"
              register={register("email", {
                required: "Требуется адрес электронной почты!",
              })}
              error={errors.email ? errors.email.message : ""}
            />
            <Textbox
              placeholder="Пароль"
              type="password"
              name="password"
              label="Пароль"
              className="w-full rounded-full"
              register={register("password", {
                required: "Требуется пароль!",
              })}
              error={errors.password ? errors.password.message : ""}
            />

            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                label="Войти"
                className="w-full h-10 bg-green-700 text-white rounded-full"
              />
            )}
          </div>
        </form>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img src={photo} alt="photo" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Login;
