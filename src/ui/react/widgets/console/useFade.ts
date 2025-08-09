import { useEffect, useState } from "react";

export function useFade(open: boolean) {
  const [state, setState] = useState<"hidden" | "entering" | "entered" | "exiting">(
    "hidden"
  );

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (open) {
      setState("entering");
      timeout = setTimeout(() => setState("entered"), 10);
    } else if (state === "entered") {
      setState("exiting");
      timeout = setTimeout(() => setState("hidden"), 180);
    } else {
      setState("hidden");
    }
    return () => timeout && clearTimeout(timeout);
  }, [open]);

  return state;
}


