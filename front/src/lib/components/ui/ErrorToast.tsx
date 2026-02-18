import Button from "./Button";

interface ErrorToastProps {
  message: string;
  onShowDetails?: () => void;
  onCopy?: () => void;
}

export default function ErrorToast({
  message,
  onShowDetails,
  onCopy,
}: ErrorToastProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>{message}</div>
      <div className="flex gap-3">
        <Button onClick={() => onShowDetails?.()} mode="text" padding="p-1">
          Show Details
        </Button>
        <Button
          onClick={() => onCopy?.()}
          mode="text"
          variant="secondary"
          padding="p-1"
        >
          Copy Error
        </Button>
      </div>
    </div>
  );
}
