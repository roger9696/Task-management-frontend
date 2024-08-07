"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function withAuth(WrappedComponent) {
  return function EnhancedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;

export { withAuth };
