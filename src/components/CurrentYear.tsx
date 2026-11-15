"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Renders the visitor's current year. Computed in the browser so the static page never goes stale. */
export function CurrentYear() {
  const year = useSyncExternalStore(
    noop,
    () => String(new Date().getFullYear()),
    () => "",
  );
  return <span suppressHydrationWarning>{year}</span>;
}
