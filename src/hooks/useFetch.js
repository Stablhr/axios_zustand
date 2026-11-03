import { useEffect, useState } from 'react'
import { getErrorMessage } from '../api/users.js'

export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let ignore = false

    setLoading(true)
    setError(null)

    fetcher()
      .then((result) => {
        if (!ignore) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(getErrorMessage(err))
          setLoading(false)
        }
      })

    return () => {
      ignore = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, ...deps])

  const refetch = () => setTick((value) => value + 1)

  return { data, loading, error, refetch }
}