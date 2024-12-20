export default function AddLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e65c00"
      strokeWidth="3"
    >
      <defs>
        <linearGradient
          id="paint0_linear_72_160"
          x1="0"
          y1="30"
          x2="24"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF7920" />
          <stop offset="1" stopColor="#EB3309" />
        </linearGradient>
      </defs>

      <rect
        width="18"
        height="18"
        x="3"
        y="3"
        rx="0"
        stroke="url(#paint0_linear_72_160)"
        strokeDasharray="11 7"
        strokeDashoffset="4.8"
      />
      <path d="M8 12h8" stroke="url(#paint0_linear_72_160)" />
      <path d="M12 8v8" stroke="url(#paint0_linear_72_160)" />
    </svg>
  );
}
