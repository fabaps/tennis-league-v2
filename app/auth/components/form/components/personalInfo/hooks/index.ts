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
      gender: "hombre",
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const { getCurrentUser } = useAuthStore();

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      const nameParts = user.displayName?.split(" ");
      form.setValue("firstName", nameParts?.[0] || "");
      form.setValue("lastName", nameParts?.[1] || "");
      form.setValue("email", user.email || "");
    }
  }, [getCurrentUser, form]);

  return { form };
};

export default useUserDefaultData;
