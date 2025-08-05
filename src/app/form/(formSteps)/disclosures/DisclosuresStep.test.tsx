import { RouterPathnameProvider } from "@/app/form/_utils/testUtils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import DisclosuresStep from "./page";

describe("<DisclosuresStep />", () => {
  const renderWithRouter = () => {
    const mockPush = jest.fn();
    const mockRefresh = jest.fn();
    const router: Partial<AppRouterInstance> = {
      push: mockPush,
      refresh: mockRefresh,
    };
    render(
      <RouterPathnameProvider pathname="/form/disclosures" router={router as AppRouterInstance}>
        <DisclosuresStep />
      </RouterPathnameProvider>,
    );
  };

  it("Only shows the tasty lunch question when the user has had lunch", async () => {
    const user = userEvent.setup();
    renderWithRouter();

    expect(screen.queryByText("Was your lunch tasty?")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("hadLunchNo"));
    expect(screen.queryByText("Was your lunch tasty?")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("hadLunchYes"));
    expect(screen.queryByText("Was your lunch tasty?")).toBeInTheDocument();
  });
});
