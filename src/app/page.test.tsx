import React from "react";
import { render, screen } from "@testing-library/react";

// Mock Next.js Image component to avoid Next.js runtime requirements in Vitest
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ComponentProps<"img">) => {
    const { src, alt, ...rest } = props as { src: string; alt: string };
    return <img src={src} alt={alt} {...rest} />;
  },
}));

import Home from "@/app/page";

describe("Home page", () => {
  it("renders the starter content", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: "To get started, edit the page.tsx file.",
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Templates" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Learning" })).toBeInTheDocument();
  });
});
