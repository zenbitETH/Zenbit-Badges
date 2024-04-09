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
      !["0x4e087b926a0752c23b4dA800424547f5932bBD0c", "0xdA7773E91a396d592AD33146164dA6d7d2Fda9B6"].includes(
        connectedAddress,
      ) &&
      (pathname == "/create-quiz" || pathname == "/create-event")
    ) {
      return <ErrorPage statusCode={404} />;
    }
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};
