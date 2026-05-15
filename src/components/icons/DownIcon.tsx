import type { SVGProps } from "react";

export function DownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      width="14" 
      height="14" 
      viewBox="0 0 14 14" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M12.2126 4.17158C12.4957 4.44495 12.4957 4.88816 12.2126 5.16153L7.37841 9.82819C7.09523 10.1016 6.63611 10.1016 6.35293 9.82819L1.78734 5.42079C1.50416 5.14742 1.50416 4.7042 1.78734 4.43084C2.07051 4.15747 2.52964 4.15747 2.81282 4.43084L6.86567 8.34327L11.1871 4.17158C11.4703 3.89821 11.9294 3.89821 12.2126 4.17158Z" fill="currentColor"/>
    </svg>
  );
}
