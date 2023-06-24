import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from '../firebase';
import { Navbar } from '../components/navbar';
import { GetServerSideProps } from "next/types";

const auth = getAuth(firebase);
 
const Profile: React.FC = () => {
  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserData(user);
        }
      });
  }, [])

  return (
    <>
      <Navbar />
      <div className="p-10">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userData?.displayName ?? ''}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email <address></address></dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userData?.email ?? ''}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Account created</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userData?.metadata.creationTime ?? ''}</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/signin",
        },
        props: {},
      };
    }
  });
  return {
    props: {},
  };
};
 
export default Profile;

