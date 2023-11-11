import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  // render the component
  render(<UserForm />);

  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // Asertion - make sure the component is doing
  // what we expected it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", async () => {
  const mock = jest.fn();

  // render the component
  render(<UserForm onUserAdd={mock} />);

  // Find the two inputs
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

  // what we expected it to do
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: "sama",
    email: "sama@gmail.com",
  });
});
