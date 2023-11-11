import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const users = [
    { name: "Sama", email: "sama@gmail.com" },
    { name: "Amirhossein", email: "amirhossin@gmail.com" },
  ];
  render(<UserList users={users} />);

  return { users };
}

// Avoiding before each
// beforeEach(() => {
//   render(<UserList users={users} />);
// });

test("render one row per user", async () => {
  // Render the component
  renderComponent();

  // const { container } = render(<UserList users={users} />);

  // Find all the rows in the table
  const rows = within(screen.getByTestId("users")).getAllByRole("row");
  // const rows = container.querySelectorAll("tbody tr");

  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
});

test("render the email and name of each user", async () => {
  // Render the component
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
