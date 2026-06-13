import { cn } from "@/lib/utils/utils";

interface IProps {
  msg?: string;
  key?: string;
  className?: string;
}
const InputErrorMessage = ({ msg, className }: IProps) => {
  return msg ? (
    <span className={cn("block text-red-700 text-sm pt-1 sm:pt-2", className)}>
      {msg}
    </span>
  ) : null;
};

export default InputErrorMessage;
