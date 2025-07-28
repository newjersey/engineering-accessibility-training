import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PersonalInformationStep from "./page";

describe("<PersonalInformationStep />", () => {
  afterEach(() => {
    window.sessionStorage.clear();
  });

  it.each([
    { name: "First name", key: "firstName", testValue: "Test first name" },
    { name: "Middle name (optional)", key: "middleName", testValue: "Test middle name" },
    { name: "Last name", key: "lastName", testValue: "Test last name" },
    { name: "Date of birth", key: "dateOfBirth", testValue: "01/01/1990" },
  ])("updates the $name text input", async ({ name, key, testValue }) => {
    const user = userEvent.setup();
    render(<PersonalInformationStep />);
    const inputField = screen.getByRole("textbox", {
      name: name,
    });
    expect(window.sessionStorage.getItem(key)).toEqual(null);

    await user.type(inputField, testValue);

    expect(inputField).toHaveValue(testValue);
    expect(window.sessionStorage.getItem(key)).toEqual(testValue);
  });
});
