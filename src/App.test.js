import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("it can recive a new user and show it on a list", async () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // Simulate typing in a name
  await user.click(nameInput);
  await user.keyboard("sama");

  // Simulate typing in an email
  await user.click(emailInput);
  await user.keyboard("sama@gmail.com");

  // Find the button
  const button = screen.getByRole("button");
  await user.click(button);

  const name = screen.getByRole("cell", { name: "sama" });
  const email = screen.getByRole("cell", { name: "sama@gmail.com" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
