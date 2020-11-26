import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`;

const Index = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(ViewerQuery);
  const viewer = data?.viewer;
  const shouldRedirect = !(loading || error || viewer);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect]);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (viewer) {
    return (
      <div>
        You're signed in as {viewer.email} goto{" "}
        <Link href="/about">
          <a>about</a>
        </Link>{" "}
        page. or{" "}
        <Link href="/signout">
          <a>signout</a>
        </Link>
      </div>
    );
  }

  return <p>Loading...</p>;
};

export default Index;
