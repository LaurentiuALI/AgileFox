// components/SvgButton.tsx
import React from "react";
import AddLogo from "./add-logo";

interface SvgButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
}

const AddButton: React.FC<SvgButtonProps> = ({ onClick, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex items-center justify-center gap-2"
    >
      <AddLogo />
      <h2 className="text-lg font-semibold w-32 hidden md:block">
        {ariaLabel}
      </h2>
    </button>
  );
};

export default AddButton;
