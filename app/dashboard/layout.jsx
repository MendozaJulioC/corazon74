import { getServerSession  } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Nav from '../../components/Navs/Navs'
import Aside from "../../components/Navs/AsideMain"


import Page from './page'


const ServerProtectedPage = async () => {


  const session = await getServerSession(authOptions)
  let imageavatar=''; 
  if (!session) {
    redirect('/login?callbackUrl=/dashboard')
  }

  if(!session?.user?.image){
    imageavatar = 'https://cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net/es/wp-content/themes/theme_alcaldia/logos/logo_footer.png'
  }else{  imageavatar = session.user.image }


  return ( 
    <>
      <Nav usuario={ session?.user?.name}  email={session?.user?.email}  avatar = {imageavatar} />
      <Aside/>
    <Page/>
    </>
  )
}

export default ServerProtectedPage  