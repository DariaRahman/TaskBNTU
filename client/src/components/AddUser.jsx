import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "sonner";

const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useDispatch();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        const result = await updateUser(data).unwrap();
        toast.success("Profile updated successfully");

        if (userData?._id === user > _id) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        await addNewUser({
          ...data,
          password: data.email,
        }).unwrap();
        toast.success("New User added successfully");
      }
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {userData ? "Редактировать профиль" : "ADD NEW USER"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Полное имя"
              type="text"
              name="name"
              label="Польное имя"
              className="w-full rounded"
              register={register("name", {
                required: "Требуется полное имя!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder="Заголовок"
              type="text"
              name="title"
              label="Заголовок"
              className="w-full rounded"
              register={register("title", {
                required: "Требуется заголовок!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder="Адрес электронной почты"
              type="email"
              name="email"
              label="Адрес электронной почты"
              className="w-full rounded"
              register={register("email", {
                required: "Требуется адрес электронной почты!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder="Роль"
              type="text"
              name="role"
              label="Роль"
              className="w-full rounded"
              register={register("role", {
                required: "Роль пользователя обязательна!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                label="Подтвердить"
              />

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Отмена"
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;
