"use client";

import { LoadingSpinner } from "@/app/form/(formSteps)/components/LoadingSpinner";
import { getValue } from "@/app/form/_utils/sessionStorage";
import FormProgressButtons from "@form/(formSteps)/components/FormProgressButtons";
import { routeToNextStep, useFormProgressPosition } from "@form/_utils/formProgressRouting";
import { Form } from "@trussworks/react-uswds";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ReviewStep: React.FC = () => {
  const router = useRouter();
  const formProgressPosition = useFormProgressPosition();
  const { handleSubmit } = useForm<object>({
    defaultValues: {},
  });
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <div>
      <LoadingSpinner loading={loading}>
        <Form
          onSubmit={handleSubmit(() => {
            routeToNextStep(router, formProgressPosition);
          })}
          className="maxw-full"
        >
          <div className="maxw-tablet">
            <h2>Personal information</h2>
            <dl>
              <dt>First name</dt>
              <dd>{getValue("firstName")}</dd>
              <dt>Last name</dt>
              <dd>{getValue("lastName")}</dd>
            </dl>
            <h2>Disclosures</h2>
            <dl>
              <dt>Had breakfast</dt>
              <dd>{getValue("hadBreakfast")}</dd>
              <dt>Breakfast tastiness</dt>
              <dd>{getValue("breakfastWasTasty")}</dd>
            </dl>
            <FormProgressButtons />
          </div>
        </Form>
      </LoadingSpinner>
    </div>
  );
};

export default ReviewStep;
