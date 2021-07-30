import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { checkToken } from 'redux/user/userActions'

function useTokenValidation() {
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    const check = async () => {
      const userDetail = JSON.parse(localStorage.getItem('userDetail'))
      if (userDetail) {
        try {
          await dispatch(checkToken(userDetail.token))
        } catch (err) {
          router.push('/wp-login')
        }
      } else {
        router.push('/wp-login')
      }
    }
    check()
  }, [])
}

export default useTokenValidation
