import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Layout from "@/components/movieApp/template/Layout";
import Home from "./home";

const NetflixApp = () => {
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/movieApp/login");
  }, [router, status]);

  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default NetflixApp;
