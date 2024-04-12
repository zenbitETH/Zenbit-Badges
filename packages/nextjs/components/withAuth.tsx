import ErrorPage from "next/error";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";

// Middleware function to check if user is authorized
export const withAuth = (WrappedComponent: React.FC<any>) => {
  const WithAuth: React.FC<any> = props => {
    const pathname = usePathname();
    const { address: connectedAddress } = useAccount();

    if (!connectedAddress) {
      return <ErrorPage statusCode={404} />;
    }
    if (
      ![
        "0x4e087b926a0752c23b4dA800424547f5932bBD0c",
        "0xdA7773E91a396d592AD33146164dA6d7d2Fda9B6",
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0xbd53471abf1C3827b8EeEF4898fcfe76821a3C2B",
      ].includes(connectedAddress) &&
      (pathname == "/create-quiz" || pathname == "/create-event")
    ) {
      return <ErrorPage statusCode={404} />;
    }
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};
