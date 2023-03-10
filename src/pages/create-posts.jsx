import { GetServerSideProps } from 'next';
import { getServerSession } from "next-auth";
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import { authOptions } from './api/auth/[...nextauth]';


const CKEditor = dynamic(() => import('../components/MyEditor'), {
  ssr: false,
});

function CreatePosts() {
  
  let Editor;

  const handleFinish = () => {
    if (Editor) {
      console.log(Editor.getData());
    }
  }

  const getEditor = (editor) => {
    Editor = editor;
  }
  
  return (
    <>
      <div>
        <div>Criar Post</div>
        <CKEditor getEditor={getEditor} />
        <button onClick={handleFinish}>Finalizar Edição</button>
      </div>
    </>
  )
}

export default CreatePosts;

export const getServerSideProps = async ({req, res}) => {
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