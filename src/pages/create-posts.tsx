import { GetServerSideProps } from 'next';
import { getServerSession } from "next-auth";

import React from 'react'
import { authOptions } from './api/auth/[...nextauth]';

function CreatePosts() {
  return (
    <div>CreatePosts</div>
  )
}

export default CreatePosts;

export const getServerSideProps: GetServerSideProps = async ({req, res}: any) => {
  const { session } = await getServerSession(req, res, authOptions);
  console.log(session);

  if (!session.user?.admin) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}