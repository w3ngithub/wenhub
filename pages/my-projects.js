import React from 'react'
// import { wrapper } from 'redux/store'
import { fetchProjects } from 'redux/project/projectActions'
import HomePage from 'components/templates/HomePage/HomePage'
import { fetchFilterOptionLists } from 'redux/common/commonActions'
import { useDispatch } from 'react-redux'
import useTokenValidation from 'hooks/useTokenValidation'

function MyProjectsPage() {
  const dispatch = useDispatch()
  useTokenValidation()
  React.useEffect(() => {
    const fetchUserData = async () => {
      const user = localStorage.getItem('userDetail')
      if (user) {
        const data = await dispatch(fetchFilterOptionLists())
        const designers = data[4]
        const developers = data[3]
        if (designers.some((x) => x.id === user.user_id)) {
          await dispatch(fetchProjects('designer', user.user_id))
        }
        if (developers.some((x) => x.id === user.user_id)) {
          await dispatch(fetchProjects('developer', user.user_id))
        }
      }
    }
    fetchUserData()
  }, [dispatch])

  return <HomePage />
}

export default MyProjectsPage

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//   const { dispatch, getState } = store
//   await dispatch(fetchFilterOptionLists())
//   const {
//     commonData: {
//       filterType: { designers, developers },
//     },
//     userData: { userDetail },
//   } = getState()
//   if (designers.some((x) => x.id === userDetail.user_id)) {
//     await dispatch(fetchProjects('designer', userDetail.user_id))
//   }
//   if (developers.some((x) => x.id === userDetail.user_id)) {
//     await dispatch(fetchProjects('developer', userDetail.user_id))
//   }
//   return {
//     revalidate: 60,
//   }
// })
