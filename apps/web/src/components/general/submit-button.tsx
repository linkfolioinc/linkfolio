"use client";
import { Button } from "@dr/ui/components/base/button";

export function SubmitButton({
  children,
  variant,
  className,
  loadingText,
  pending,
  disable,
}: {
  children: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
  loadingText: string
  pending: boolean;
  disable? : boolean;
}) {

  return (
    <Button
      variant={variant}
      className={className}
      type="submit"
      disabled={pending || disable}
    >
      {pending ? (
        <>
          <span className="mr-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}