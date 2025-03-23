"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      {error.message} {error.stack}
      <Button onClick={reset}> Try again</Button>
    </div>
  );
}
