type HarpMotifProps = {
  className?: string;
};

export function HarpMotif({ className }: HarpMotifProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 240 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M51 267C83 213 98 156 91 46" stroke="currentColor" strokeLinecap="round" strokeWidth="10" />
      <path d="M91 46C131 43 164 57 188 85" stroke="currentColor" strokeLinecap="round" strokeWidth="10" />
      <path d="M188 85C156 140 148 201 160 266" stroke="currentColor" strokeLinecap="round" strokeWidth="10" />
      <path d="M43 268H173" stroke="currentColor" strokeLinecap="round" strokeWidth="10" />
      <path d="M102 72L79 252M120 71L104 252M138 75L129 252M155 82L153 252" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
      <circle cx="91" cy="46" fill="currentColor" r="8" />
    </svg>
  );
}
