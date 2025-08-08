"use client";

import JuiceShopExplainer from "@/app/form/(formSteps)/personal-information/JuiceShopExplainer";
import FormProgressButtons from "@form/(formSteps)/components/FormProgressButtons";
import { routeToNextStep, useFormProgressPosition } from "@form/_utils/formProgressRouting";
import {
  DateInputGroup,
  Fieldset,
  Form,
  FormGroup,
  Label,
  Select,
  Textarea,
  TextInput,
} from "@trussworks/react-uswds";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { type SubmitErrorHandler, type SubmitHandler, useForm } from "react-hook-form";

export interface PersonalInformationData {
  juiceShopRelationship: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  dateOfBirthMonth: string | null;
  dateOfBirthDay: string | null;
  dateOfBirthYear: string | null;
  anythingElse: string | null;
}

const orderedInputNameToLabel: { [key in keyof PersonalInformationData]: string } = {
  juiceShopRelationship: "Juice shop relationship",
  firstName: "First name",
  middleName: "Middle name",
  lastName: "Last name",
  dateOfBirthMonth: "Month",
  dateOfBirthDay: "Day",
  dateOfBirthYear: "Year",
  anythingElse: "Is there anything else you would like to share about yourself?",
};

const PersonalInformationStep: React.FC = () => {
  const router = useRouter();
  const formProgressPosition = useFormProgressPosition();
  const [dataHasLoaded, setDataHasLoaded] = useState<boolean>(false);
  const [shouldSummarizeErrors, setShouldSummarizeErrors] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<PersonalInformationData>({
    defaultValues: {
      juiceShopRelationship: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirthMonth: "",
      dateOfBirthDay: "",
      dateOfBirthYear: "",
    },
    shouldFocusError: false,
  });
  const errorSummaryRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<PersonalInformationData> = () => {
    routeToNextStep(router, formProgressPosition);
  };
  const onError: SubmitErrorHandler<PersonalInformationData> = (errors) => {
    if (Object.keys(errors).length >= 3) {
      setShouldSummarizeErrors(true);
      errorSummaryRef.current?.focus();
    } else {
      setShouldSummarizeErrors(false);
      for (const inputName of Object.keys(orderedInputNameToLabel) as Array<
        keyof PersonalInformationData
      >) {
        if (errors[inputName] !== undefined) {
          setFocus(inputName);
          break;
        }
      }
    }
  };

  useEffect(() => {
    setDataHasLoaded(true);
  }, []);

  return (
    <div>
      {dataHasLoaded && (
        <Form onSubmit={handleSubmit(onSubmit, onError)} className="maxw-full" noValidate>
          <div className="grid-row grid-gap-lg">
            <div className="flex-2">
              <div tabIndex={-1} ref={errorSummaryRef}>
                {shouldSummarizeErrors && Object.keys(errors).length >= 1 && (
                  <div
                    className="usa-alert usa-alert--error margin-bottom-3 border-05 border-top-105 border-secondary-dark"
                    aria-labelledby="error-summary-heading"
                  >
                    <div className="usa-alert__body">
                      <h3 className="usa-alert__heading" id="error-summary-heading">
                        There is a problem
                      </h3>

                      <ul className="usa-list usa-list--unstyled">
                        {Object.entries(errors).map(([field, error]) => {
                          return (
                            <li key={field}>
                              <a
                                href={`#${field}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFocus(field as keyof PersonalInformationData);
                                }}
                              >
                                {error.message}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <h2 className="font-heading-md">Personal relationships</h2>
              <div id="juiceShopRelationship" className="margin-top-3">
                {orderedInputNameToLabel["juiceShopRelationship"]}
              </div>
              <span className="usa-hint" id="juiceShopRelationshipHint">
                Describe your personal relationship with the juice shop.
              </span>
              <Textarea
                id="juiceShopRelationship"
                rows={2}
                aria-label="Juice shop"
                aria-describedby="juiceShopRelationshipHint"
                {...register("juiceShopRelationship")}
              />

              <hr className="margin-top-5 margin-bottom-5" />
              <h2 className="font-heading-md">Personal identification</h2>
              <Fieldset legend="Name" legendStyle="srOnly" className="grid-row grid-gap">
                <div className="tablet:grid-col-4">
                  <Label htmlFor="firstName" requiredMarker>
                    {orderedInputNameToLabel["firstName"]}
                  </Label>
                  <TextInput
                    id="firstName"
                    data-testid="firstName"
                    type="text"
                    required
                    validationStatus={errors.firstName ? "error" : undefined}
                    aria-invalid={errors.firstName ? "true" : "false"}
                    aria-describedby={errors.firstName && "firstNameErrorMessage"}
                    {...register("firstName", {
                      required: `${orderedInputNameToLabel["firstName"]} is required`,
                    })}
                  />
                  {errors.firstName && (
                    <span id="firstNameErrorMessage" className="usa-error-message">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="tablet:grid-col-4">
                  <div id="middleName" className="margin-top-3">
                    {orderedInputNameToLabel["middleName"]}
                  </div>
                  <TextInput
                    id="middleName"
                    aria-labelledby="middleName"
                    data-testid="middleName"
                    type="text"
                    {...register("middleName")}
                  />
                </div>
                <div className="tablet:grid-col-4">
                  <Label htmlFor="lastName" requiredMarker>
                    {orderedInputNameToLabel["lastName"]}
                  </Label>
                  <TextInput
                    id="lastName"
                    data-testid="lastName"
                    type="text"
                    validationStatus={errors.lastName ? "error" : undefined}
                    aria-invalid={errors.lastName ? "true" : "false"}
                    aria-describedby={errors.lastName && "lastNameErrorMessage"}
                    {...register("lastName", {
                      required: `${orderedInputNameToLabel["lastName"]} is required`,
                    })}
                  />
                  {errors.lastName && (
                    <span id="lastNameErrorMessage" className="usa-error-message">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </Fieldset>

              <Fieldset legend="Date of birth" className="margin-top-3" requiredMarker>
                <span className="usa-hint">For example: April 28 1986</span>
                <DateInputGroup>
                  <FormGroup className="usa-form-group--month usa-form-group--select">
                    <Label htmlFor="dateOfBirthMonth" requiredMarker>
                      {orderedInputNameToLabel["dateOfBirthMonth"]}
                    </Label>
                    <Select
                      id="dateOfBirthMonth"
                      required
                      validationStatus={errors.dateOfBirthMonth ? "error" : undefined}
                      aria-invalid={errors.dateOfBirthMonth ? "true" : "false"}
                      {...register("dateOfBirthMonth", {
                        required: `${orderedInputNameToLabel["dateOfBirthMonth"]} is required`,
                      })}
                    >
                      <option value="1">01 - January</option>
                      <option value="2">02 - February</option>
                      <option value="3">03 - March</option>
                      <option value="4">04 - April</option>
                      <option value="5">05 - May</option>
                      <option value="6">06 - June</option>
                      <option value="7">07 - July</option>
                      <option value="8">08 - August</option>
                      <option value="9">09 - September</option>
                      <option value="10">10 - October</option>
                      <option value="11">11 - November</option>
                      <option value="12">12 - December</option>
                    </Select>
                  </FormGroup>
                  <FormGroup className="usa-form-group--day">
                    <Label htmlFor={"dateOfBrthDay"} requiredMarker>
                      {orderedInputNameToLabel["dateOfBirthDay"]}
                    </Label>
                    <TextInput
                      id={"dateOfBirthDay"}
                      type="text"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      maxLength={2}
                      minLength={2}
                      required
                      validationStatus={errors.dateOfBirthDay ? "error" : undefined}
                      {...register("dateOfBirthDay", {
                        required: `${orderedInputNameToLabel["dateOfBirthDay"]} is required`,
                        valueAsNumber: true,
                        min: {
                          value: 1,
                          message: `${orderedInputNameToLabel["dateOfBirthDay"]} must be between 1 and 31`,
                        },
                        max: {
                          value: 31,
                          message: `${orderedInputNameToLabel["dateOfBirthDay"]} must be between 1 and 31`,
                        },
                        validate: (value) => {
                          if (value === null) {
                            return `${orderedInputNameToLabel["dateOfBirthDay"]} is required`;
                          }
                          if (Number.isNaN(value) || typeof value === "string") {
                            return `${orderedInputNameToLabel["dateOfBirthDay"]} must be a number`;
                          }
                          return true;
                        },
                      })}
                    />
                  </FormGroup>
                  <FormGroup className="usa-form-group--year">
                    <Label htmlFor="dateOfBirthYear" requiredMarker>
                      {orderedInputNameToLabel["dateOfBirthYear"]}
                    </Label>
                    <TextInput
                      id="dateOfBirthYear"
                      type="text"
                      maxLength={4}
                      minLength={4}
                      pattern="[0-9]*"
                      inputMode="numeric"
                      required
                      validationStatus={errors.dateOfBirthYear ? "error" : undefined}
                      aria-describedby={errors.dateOfBirthYear && "dateOfBirthYearErrorMessage"}
                      {...register("dateOfBirthYear", {
                        required: `${orderedInputNameToLabel["dateOfBirthYear"]} is required`,
                        valueAsNumber: true,
                        validate: (value) => {
                          if (value === null) {
                            return `${orderedInputNameToLabel["dateOfBirthYear"]} is required`;
                          }
                          if (Number.isNaN(value) || typeof value === "string") {
                            return `${orderedInputNameToLabel["dateOfBirthYear"]} must be a number`;
                          }
                          if ((value as number).toString().length !== 4) {
                            return `${orderedInputNameToLabel["dateOfBirthYear"]} must have four digits`;
                          }
                          return true;
                        },
                      })}
                    />
                  </FormGroup>
                </DateInputGroup>
                {errors.dateOfBirthMonth && (
                  <div id="dateOfBirthMonthErrorMessage" className="usa-error-message">
                    {errors.dateOfBirthMonth.message}
                  </div>
                )}
                {errors.dateOfBirthDay && (
                  <div id="dateOfBirthDayErrorMessage" className="usa-error-message">
                    {errors.dateOfBirthDay.message}
                  </div>
                )}
                {errors.dateOfBirthYear && (
                  <div id="dateOfBirthYearErrorMessage" className="usa-error-message">
                    {errors.dateOfBirthYear.message}
                  </div>
                )}
              </Fieldset>
              <div className="margin-top-3">{orderedInputNameToLabel["anythingElse"]}</div>
              <Textarea
                id="anythingElse"
                rows={2}
                aria-label="anythingElse"
                {...register("anythingElse")}
              />
            </div>
            <div className="flex-1">
              <JuiceShopExplainer />
            </div>
          </div>
          <FormProgressButtons />
        </Form>
      )}
    </div>
  );
};

export default PersonalInformationStep;
