import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import formSchema from "../utils";

const useUserDefaultData = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "",
      firstName: "",
      picture: "",
      phone: "",
      lastName: "",
      email: "",
    },
  });

  const { currentUser } = useAuthStore();

  useEffect(() => {
    if (currentUser) {
      form.setValue("picture", currentUser.picture || "");
      form.setValue("firstName", currentUser.firstName || "");
      form.setValue("lastName",currentUser.lastName || "");
      form.setValue("email", currentUser.email || "");
      form.setValue("phone", currentUser.phone || "");
    }
  }, [currentUser, form]);

  return { form } as const;
};

export default useUserDefaultData;
