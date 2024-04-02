import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";

// Third part Imports
import * as yup from "yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginProps } from "@/types";
import { ErrorMessage } from "../FormFiles/ErrorMessage";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import authServices from "@/services/authServices";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/userSlice";
import toast from "react-hot-toast";

export default function LoginFormModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues: LoginProps = {
    email: "",
    password: "",
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be of atleast 6 Characters")
      .required("Password is required"),
  });

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginProps>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const showPasswordHandler = (): void => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const submitForm: SubmitHandler<LoginProps> = async (data, e) => {
    e?.preventDefault();
    try {
      const res = await authServices.login(data);
      if (res.status === 200) {
        reset();
        dispatch(setUser(res.data.data));
        onOpenChange();
        toast.success("Logged in Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        onPress={onOpen}
        className="max-w-fit text-lg md:text-[1rem] justify-start px-2 md:px-1 bg-transparent"
      >
        Login
      </Button>
      <Modal
        isOpen={isOpen}
        placement="center"
        className="bg-[#888]"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Login
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-2"
                  method="POST"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(submitForm)}
                >
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        isRequired
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    )}
                  />
                  {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                  )}
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        isRequired
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={showPasswordHandler}
                          >
                            {showPassword ? (
                              <MdVisibility className="h-6 w-6 text-black" />
                            ) : (
                              <MdVisibilityOff className="h-6 w-6 text-black" />
                            )}
                          </button>
                        }
                        placeholder="Enter your password"
                        {...field}
                      />
                    )}
                  />
                  {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                  )}
                  <ModalFooter>
                    <Button
                      type="button"
                      className="bg-[#666] text-wite"
                      onPress={onClose}
                    >
                      Close
                    </Button>
                    <Button type="submit">Submit</Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
