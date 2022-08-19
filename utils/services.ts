export const getApiData = async(
    path: string,
    method: string, 
    setLoading: (loading: boolean) => void, 
    body?: unknown,

) => {
    try {
        setLoading(false)
        const data = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}${path}`, {
            method,
            headers: method === 'POST' || method === 'PATCH' ? 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } : undefined,
            body: JSON.stringify(body)
        })
        const json  = await data.json()
        return json

    } catch(err) {
        console.error(err)
    } finally {
        setLoading(true)
    }
  }