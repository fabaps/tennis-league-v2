"use client";
import { Mail, Mars, User as UserIcon, UserPlus, Venus } from "lucide-react";
import { z } from "zod";

import View from "@/components/layout/view";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputWithIcon } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radioGroup";
import { useAuthContext } from "@/providers/auth/hooks";
import { User } from "@/types/user";

import RadioItem from "./components/radioItem";
import useUserDefaultData from "./hooks";
import formSchema from "./utils";
import { LOGIN_STEP } from "../../utils";

interface PersonalInfoStepProps {
  onSubmit?: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({}) => {
  const { form } = useUserDefaultData();
  const { setPersonalInfo, setStep } = useAuthContext();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setPersonalInfo(values as Partial<User>);
    setStep(LOGIN_STEP.QUESTIONS);
  };

  return (
    <View data-id="personal-info" className="bg-primary">
      <div className="bg-white rounded-lg w-full p-5">
        <div className="animate-fade flex flex-col space-y-5 h-max">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-primary text-2xl font-bold text-center">
              Bienvenido a la GTL
            </h1>
            <p className="text-md text-gray-500">Completa tus datos personales</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-7 w-full"
            >
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithIcon
                        icon={<UserIcon className="text-gray-400" />}
                        placeholder="Primer nombre"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <InputWithIcon
                        icon={<UserPlus className="text-gray-400" />}
                        placeholder="Primer apellido"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <InputWithIcon
                        icon={<Mail className="text-gray-400" />}
                        placeholder="Correo electrónico"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => {
                  const value = field.value as string;

                  return (
                    <FormItem className="w-full">
                      <RadioGroup
                        value={value}
                        onValueChange={field.onChange}
                        className="flex flex-row space-x-2"
                      >
                        <RadioItem
                          label="Hombre"
                          isActive={value === "hombre"}
                          icon={<Mars />}
                        />
                        <RadioItem
                          label="Mujer"
                          isActive={value === "mujer"}
                          icon={<Venus />}
                        />

                        <FormMessage />
                      </RadioGroup>
                    </FormItem>
                  );
                }}
              />

              <Button type="submit" className="w-full" variant='green'>
                Continuar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </View>
  );
};

export default PersonalInfoStep;
