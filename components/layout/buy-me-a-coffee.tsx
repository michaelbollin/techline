"use client";

import { useEffect } from "react";

import { cn } from "@/lib/cn";
import { Tooltip } from "@/components/ui/tooltip";
import { TIMELINE_DESKTOP_MEDIA_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import { SITE_BMC_USERNAME, SITE_BMC_URL } from "@/lib/site";

const BMC_SRC = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
const BMC_SCRIPT_SELECTOR = 'script[data-name="BMC-Widget"]';

let bmcLoadStarted = false;
let bmcInitRetried = false;

function waitForBmcWidget(deadlineMs = 3000) {
  const started = Date.now();

  const poll = () => {
    if (document.getElementById("bmc-wbtn")) {
      return;
    }

    if (Date.now() - started >= deadlineMs) {
      if (!bmcInitRetried && document.readyState !== "loading") {
        bmcInitRetried = true;
        document.dispatchEvent(new Event("DOMContentLoaded"));
      }
      return;
    }

    window.requestAnimationFrame(poll);
  };

  poll();
}

function triggerBmcInit() {
  if (document.readyState === "loading") {
    return;
  }

  waitForBmcWidget();
}

function loadBmcScript() {
  if (document.querySelector(BMC_SCRIPT_SELECTOR) || bmcLoadStarted) {
    triggerBmcInit();
    return;
  }

  bmcLoadStarted = true;

  const script = document.createElement("script");
  script.src = BMC_SRC;
  script.setAttribute("data-name", "BMC-Widget");
  script.setAttribute("data-cfasync", "false");
  script.setAttribute("data-id", SITE_BMC_USERNAME);
  script.setAttribute("data-description", "Support me on Buy me a coffee!");
  script.setAttribute("data-message", "");
  script.setAttribute("data-color", "#BD5FFF");
  script.setAttribute("data-position", "Right");
  script.setAttribute("data-x_margin", "18");
  script.setAttribute("data-y_margin", "18");

  script.addEventListener("load", triggerBmcInit);
  document.body.appendChild(script);
}

/** Loads the BMC overlay widget and keeps its floating button hidden (footer icon opens it). */
export function BuyMeACoffeeScript() {
  useEffect(() => {
    loadBmcScript();
  }, []);

  return null;
}

const COFFEE_ICON_PATH =
  "M12.406 14.75c-0.094-2.094-0.219-3.219-1.469-4.594-1.594-1.781-2.188-3.5-0.875-6.156 0.344 1.781 0.469 3.375 1.719 4.344s2.281 3.594 0.625 6.406zM10.063 14.75c-0.063-1.125-0.125-1.688-0.813-2.469-0.844-0.938-1.188-1.844-0.469-3.281 0.188 0.969 0.219 1.813 0.906 2.313s1.281 1.938 0.375 3.438zM15.719 24.625h5.688c0.344 0 0.469 0.25 0.25 0.531 0 0-2.219 2.844-5.281 2.844h-10.969s-5.281-2.844-5.281-2.844c-0.219-0.281-0.125-0.531 0.219-0.531h5.625c-0.781-0.406-1.938-2.188-1.938-4.406v-4.688h13.688v0.375c0.438-0.375 0.969-0.563 1.531-0.563 0.781 0 2.25 0.813 2.25 2.219 0 2.031-1.344 2.781-2.125 3.313 0 0-1.469 1.156-2.5 2.5-0.344 0.594-0.75 1.063-1.156 1.25zM19.25 16.188c-0.5 0-1.125 0.219-1.531 1.219v2.594c0 0.344-0.031 0.75-0.094 1.094 0.688-0.688 1.5-1.156 1.5-1.156 0.5-0.344 1.5-1 1.5-2.281 0.031-0.906-0.813-1.469-1.375-1.469zM6.406 16.563h-0.875v1.281h0.875v-1.281zM6.406 18.594h-0.875v2.094s0.25 2.813 2.031 3.656c-1.094-1.281-1.156-2.75-1.156-3.656v-2.094z";

function BuyMeACoffeeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-5 0 32 32"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={COFFEE_ICON_PATH} fill="currentColor" />
    </svg>
  );
}

function openBuyMeACoffeeWidget() {
  const bmcButton = document.getElementById("bmc-wbtn");
  if (bmcButton) {
    bmcButton.click();
    return;
  }

  loadBmcScript();
  window.open(SITE_BMC_URL, "_blank", "noopener,noreferrer");
}

const buttonClassName =
  "inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-2 text-black hover:text-black/70";

type BuyMeACoffeeButtonProps = {
  className?: string;
};

export function BuyMeACoffeeButton({ className }: BuyMeACoffeeButtonProps) {
  const isDesktop = useMediaQuery(TIMELINE_DESKTOP_MEDIA_QUERY);

  if (!isDesktop) {
    return (
      <a
        href={SITE_BMC_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonClassName, className)}
        aria-label="Buy me a coffee!"
      >
        <BuyMeACoffeeIcon className="h-[2.1rem] w-[2.1rem]" />
      </a>
    );
  }

  return (
    <Tooltip label="Buy me a coffee!" side="top">
      <button
        type="button"
        onClick={openBuyMeACoffeeWidget}
        className={cn(buttonClassName, className)}
        aria-label="Buy me a coffee!"
      >
        <BuyMeACoffeeIcon className="h-[2.1rem] w-[2.1rem]" />
      </button>
    </Tooltip>
  );
}
