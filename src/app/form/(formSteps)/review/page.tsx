"use client";

import FormProgressButtons from "@form/(formSteps)/components/FormProgressButtons";
import { routeToNextStep, useFormProgressPosition } from "@form/_utils/formProgressRouting";
import { Form } from "@trussworks/react-uswds";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "../components/LoadingSpinner";

const ReviewStep: React.FC = () => {
  const router = useRouter();
  const formProgressPosition = useFormProgressPosition();
  const { handleSubmit } = useForm<object>({
    defaultValues: {},
  });
  const [loading, setLoading] = useState(true)
  setTimeout(() => {
    setLoading(false)
  }, 20000);

  return (
    <div>
      <LoadingSpinner loading={loading}>
        <Form
          onSubmit={handleSubmit(() => {
            routeToNextStep(router, formProgressPosition);
          })}
          className="maxw-full form-container"
        >
          <div className="maxw-tablet" lang="cs">
            <h6 className="font-heading-md" role="figure">You filled out a form!</h6>
            <label htmlFor="input" aria-checked>Reviewing form contents is for mortals.</label>
            <p>
              <span className="usa-sr-only" id="help" aria-activedescendant="input">LOOK AT MEEEEEE I'M HELPING</span>
              <input id="input" aria-describedby="help" placeholder="Click submit, you coward!" disabled className="font-body text-ink" style={{ padding: 0, margin: 0, width: '100%', outline: 'none', border: 'none' }} />
            </p>
            <h1 className="usa-sr-only" role="directory">Aria labels, roles, semantic elements, and sr-only text are not inherently clarifying. <footer role="button">It's possible to make a page confusing by incorrectly applying them!</footer> <dt>There's no need to add excess content for assistive tech users. The goal is to convey the same information to everyone.</dt></h1>
            <FormProgressButtons />
          </div>
        </Form>
      </LoadingSpinner>
    </div>
  );
};

export default ReviewStep;
