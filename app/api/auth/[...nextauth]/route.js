
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from  "next-auth/providers/google";
import bcrypt from 'bcryptjs'

export const authOPtions = {
    secret: process.env.NEXTAUTH_SECRET,
    session :{
        strategy:'jwt'
    },
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
    ],
    callbacks:{
         async jwt ({token}){
            return token;
        },
         async session ({session}){
            return session;
        },
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
            //  console.log(profile.email_verified);
                if(profile.email_verified){ 
                    const res =  await  fetch(`https://j4ch.kratiaanalitik.net/api/auth/creo/validate/email/${profile.email}`);
                    const user = await res.json()
                    if(user.success){return true}
                }
            }
            if(user.email){
                const res =  await  fetch(`https://j4ch.kratiaanalitik.net/api/auth/creo/validate/email/${user.email}`);
                const usuario = await res.json()
                if(usuario.success){return true}
            }
          }
    },
    pages:{
        signIn:'/',
        signOut:'/',
         //error: '/api/auth/error',
       error: '/noautorizado',
    },
}

const handler = NextAuth(authOPtions)
export { handler as GET, handler as POST}


