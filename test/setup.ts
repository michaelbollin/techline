import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { createElement } from "react";
import { afterEach, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    unoptimized: _unoptimized,
    ...props
  }: {
    src: string;
    alt?: string;
    unoptimized?: boolean;
  }) => createElement("img", { src, alt, ...props }),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => createElement("a", { href, ...props }, children),
}));

afterEach(() => {
  cleanup();
});

Object.defineProperty(document, "fonts", {
  value: {
    ready: Promise.resolve(),
  },
  configurable: true,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

/** Toggle in tests that need ResizeObserver to fire on observe. */
export const testResizeObserver = { fireOnObserve: false };

class ResizeObserverMock {
  private callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    if (testResizeObserver.fireOnObserve) {
      this.callback([{ target } as ResizeObserverEntry], this);
    }
  }

  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;
