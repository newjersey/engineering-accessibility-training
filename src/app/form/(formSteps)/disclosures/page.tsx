"use client";

import { setKeyValue } from "@/app/form/_utils/sessionStorage";
import FormProgressButtons from "@form/(formSteps)/components/FormProgressButtons";
import { routeToNextStep, useFormProgressPosition } from "@form/_utils/formProgressRouting";
import { Fieldset, Form, Radio } from "@trussworks/react-uswds";
import { useRouter } from "next/navigation";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface DisclosuresData {
  hadLunch: "true" | "false" | "";
  lunchWasTasty: "true" | "false" | "";
}

const DisclosuresStep: React.FC = () => {
  const router = useRouter();
  const formProgressPosition = useFormProgressPosition();
  const { register, handleSubmit, watch } = useForm<DisclosuresData>({
    defaultValues: {
      hadLunch: "",
      lunchWasTasty: "",
    },
  });
  const hadLunch = watch("hadLunch");
  const lunchWasTasty = watch("lunchWasTasty");

  const onSubmit: SubmitHandler<DisclosuresData> = (data) => {
    let key: keyof DisclosuresData;
    for (key in data) {
      const value = data[key] ?? "";
      setKeyValue(key, value);
    }
    routeToNextStep(router, formProgressPosition);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className="maxw-full form-container">
        <div className="maxw-tablet">
          <h3 className="font-heading-md">Lunch information</h3>
          <Fieldset legend="Have you had lunch today?" legendStyle="default">
            <Radio id="hadLunchYes" label="Yes" value="true" {...register("hadLunch")} />
            <Radio id="hadLunchNo" label="No" value="false" {...register("hadLunch")} />
          </Fieldset>
          {hadLunch === "true" && (
            <div className="padding-y-4">
              <Fieldset legend="Was your lunch tasty?" legendStyle="default">
                <Radio id="lunchYes" label="Yes" value="true" {...register("lunchWasTasty")} />
                <Radio id="lunchNo" label="No" value="false" {...register("lunchWasTasty")} />
              </Fieldset>
              {lunchWasTasty !== "" && (
                <div className="padding-y-4">{lunchWasTasty === "true" ? "Yay!" : "Boo"}</div>
              )}
            </div>
          )}
        </div>
        <FormProgressButtons />
      </Form>
    </div>
  );
};

export default DisclosuresStep;
