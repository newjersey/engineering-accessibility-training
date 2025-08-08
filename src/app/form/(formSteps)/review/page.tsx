"use client";

import FormProgressButtons from "@form/(formSteps)/components/FormProgressButtons";
import { routeToNextStep, useFormProgressPosition } from "@form/_utils/formProgressRouting";
import { Form } from "@trussworks/react-uswds";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const FormStep: React.FC = () => {
  const router = useRouter();
  const formProgressPosition = useFormProgressPosition();
  const { handleSubmit } = useForm<object>({
    defaultValues: {},
  });
  return (
    <div>
      <Form
        onSubmit={handleSubmit(() => {
          routeToNextStep(router, formProgressPosition);
        })}
        className="maxw-full form-container"
      >
        <div className="maxw-tablet">
          <FormProgressButtons />
          <h6 className="font-heading-md">You filled out a form!</h6>
          <label htmlFor="input">Reviewing form contents is for mortals.</label>
          <p>
            <input id="input" placeholder="Click submit, you coward!" disabled className="font-body text-ink" style={{ padding: 0, margin: 0, width: '100%', outline: 'none', border: 'none'}}/>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default FormStep;
