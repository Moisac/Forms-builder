import { NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

const AuthPrivateRoute = (WrappedComponent: NextPage) => {
  // eslint-disable-next-line react/display-name
  return (props: JSX.IntrinsicAttributes) => {
    if (typeof window !== "undefined") {
        const router = useRouter()
        const session = useSession()

      if(session?.status !== 'loading') {
        if (session?.status === 'authenticated') {
          router.push("/")
          return null
        } else {
            return <WrappedComponent {...props} />
        }
      }
    }

    return null;
  };
};

export default AuthPrivateRoute