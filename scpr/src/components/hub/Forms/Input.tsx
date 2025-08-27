import { errorClass } from "@/app/assets/style";

const Input = ({
  value,
  onChange,
  label,
  inputState,
  focused,
  message,
  placeholder,
  className,
}: {
  value: string;
  onChange: (text: string) => void;
  label?: string;
  inputState?: "error" | "ok" | "unique" | "need" | "in" | " ";
  focused?: () => void;
  message?: string;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-col transition-all duration-700">
      {label && (
        <label
          className={`font-medium ${
            inputState === "in"
              ? "text-blue-500"
              : inputState === "ok"
              ? "text-green-500"
              : inputState === "unique"
              ? "text-red-300 "
              : inputState === "need"
              ? "text-yellow-500"
              : inputState === "error"
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {label}
        </label>
      )}
      <input
        onFocus={focused}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={` ${className} ${
          ["error", "unique", "need"].includes(inputState as string) &&
          errorClass
        } input border bg-white border-gray-300  px-3  ${
          inputState === "in"
            ? "bg-blue-50 shadow-sm shadow-blue-500 text-blue-900"
            : inputState === "ok"
            ? "bg-green-50 shadow-sm shadow-green-500 text-green-900"
            : inputState === "unique"
            ? "bg-[rgb(225,46,40)] border-2 border-[#ff5e00] shadow-sm shadow-orange-400 text-[#ffffff]"
            : inputState === "need"
            ? "bg-yellow-100 shadow-sm shadow-yellow-500 text-[#f70909]"
            : inputState === "error" && "bg-red-50 shadow-sm shadow-red-500"
        }`}
      />
      <b
        className={`px-1 ${
          inputState === "in"
            ? "text-blue-500"
            : inputState === "ok"
            ? "text-green-500"
            : inputState === "unique"
            ? "text-red-300 "
            : inputState === "need"
            ? "text-yellow-500"
            : inputState === "error" && "text-red-500"
        }`}
      >
        {message}
      </b>
    </div>
  );
};

export default Input;
