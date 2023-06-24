import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from 'next-auth';
import firebase from '../../../firebase';

const auth = getAuth(firebase);

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
       credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string,
          password: string,
        };
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          return {
            id: userCredential.user.uid,
            email: userCredential.user.email,
          };
        } catch (error) {
         console.error(error);
          throw new Error('Error de autenticación');
        }
      }
    })
  ],
  pages: {
    signIn: '/signin',
  },
});



