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
import { EditProfileProps, UserProps } from "@/types";
import { ErrorMessage } from "../FormFiles/ErrorMessage";
import authServices from "@/services/authServices";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/userSlice";
import toast from "react-hot-toast";

export default function EditProfileModal({
  profile,
  isOpen,
  onOpenChange,
}: {
  profile: UserProps;
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const dispatch = useAppDispatch();

  const defaultValues: EditProfileProps = {
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    mobile: profile.mobile,
  };

  const schema = yup.object().shape({
    first_name: yup
      .string()
      .min(3, "First name must be of atleast 3 digits")
      .required("First name is required"),
    last_name: yup
      .string()
      .min(3, "Last name must be of atleast 3 digits")
      .required("Last name is required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    mobile: yup
      .string()
      .min(10, "Phone number must be of atleast 10 digits")
      .required("Phone is required"),
  });

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<EditProfileProps>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const submitForm: SubmitHandler<EditProfileProps> = async (data, e) => {
    e?.preventDefault();
    try {
      const res = await authServices.updateProfile(data, profile.token);
      if (res.status === 200) {
        reset();
        onOpenChange();
        const profileData = await authServices.getProfile(profile.token);
        const { token, ...updatedData } = profileData.data.data;
        const updatedProfile = { token: profile.token, ...updatedData };
        dispatch(setUser(updatedProfile));
        toast.success("Updated profile Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
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
                Edit Profile
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-2"
                  method="POST"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(submitForm)}
                >
                  <p className="flex items-center text-black text-xl justify-between capitalize">
                    {profile.first_name + " " + profile.last_name}
                  </p>
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
                  {errors?.email && (
                    <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                  )}
                  <Controller
                    name="mobile"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        isRequired
                        label="Mobile"
                        type="number"
                        placeholder="Enter your mobile"
                        {...field}
                      />
                    )}
                  />
                  {errors?.mobile && (
                    <ErrorMessage>{errors?.mobile?.message}</ErrorMessage>
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
