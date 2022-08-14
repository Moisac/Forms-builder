import { NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

const AuthRoute = (WrappedComponent: NextPage) => {
  // eslint-disable-next-line react/display-name
  return (props: JSX.IntrinsicAttributes) => {
    if (typeof window !== "undefined") {
        const router = useRouter()
        const session = useSession()

      if(session?.status !== 'loading') {
        if (session?.status === 'unauthenticated') {
          router.push("/auth/signin")
          return null
        } else if (session?.status === 'authenticated') {
            return <WrappedComponent {...props} />
        }
      }
    }

    return null;
  };
};

export default AuthRoute