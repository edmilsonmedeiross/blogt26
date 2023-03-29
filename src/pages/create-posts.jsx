import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';
import { authOptions } from './api/auth/[...nextauth]';
import Categories from '../components/Categories';
import { useAtom } from 'jotai';
import { atomCategories, fetchCategories } from '../jotai/JotaiCategories';
import { dehydrate, QueryClient } from 'react-query';
import WidgetUpload from '@/components/WidgetUpload';
import { AtomEditor, AtomWidgetVisible, AtomSending, AtomWidget, AtomTitle } from '@/jotai/atomsAplication';
import { CldImage } from 'next-cloudinary';

const CKEditor = dynamic(() => import('../components/MyEditor'), {
  ssr: false,
});

// cria states com Jotai ==> https://jotai.org
function CreatePosts() { 
  const [categories] = useAtom(atomCategories);
  const [title, setTitle] = useAtom(AtomTitle);
  const [Editor, getEditor] = useAtom(AtomEditor);
  const [sending, setSending] = useAtom(AtomSending);
  const [thumb] = useAtom(AtomWidget);
  const { data: { user } } = useSession();
  const [isWidgetVisible, setWidgetVisible] = useAtom(AtomWidgetVisible);

  useEffect(() => {
    const local = localStorage?.getItem('savedTitle');
    setTitle(local);
    setWidgetVisible(true);
  }, []);

  const handleFinish = async () => {
    if (!thumb) {
      alert('Está faltando uma imagem de Thumbnail!');
    }

    if (!title) {
      alert('Preencha o título do post!');
      return;
    }

    if (!categories.some((category) => !category.checked)) {
      alert('Selecione ao menos uma categoria!');
      return;
    }

    if (Editor && !sending) {
      const postInfos = {
        postId: v4(),
        title,
        slug: title.toLowerCase().replace(/ /g, '-'),
        content: Editor.getData(),
        categories: categories.filter((category) => category.checked),
        published: true,
        authorId: user?.userId,
        thumb,
      };

      setSending(true);

      axios
        .post('/api/posts', {
          postInfos,
        })
        .then((res) => {
          console.log('res', res);
          localStorage.removeItem('savedTitle');
          localStorage.removeItem('savedContent');
          localStorage.removeItem('savedCategories');
        })
        .then(() => {
          window.location.replace(`/posts/${postInfos.slug}`);
        })
        .catch((err) => {
          console.log('err', err);
          alert(err.response.data.message);
        });

      setSending(false);
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
    localStorage.setItem('savedTitle', e.target.value);
  };

  return (
    <div>
      <div>Criar Post</div>

      {/* {categories?.length !== 0 && (
      <Categories />)} */}
      <Categories />
      <input
      type="text"
      value={title}
      onChange={handleTitle}
      placeholder="Título do Post"
      />

      { isWidgetVisible && <WidgetUpload />}

      <CKEditor getEditor={getEditor} />
      <br />

      <button onClick={handleFinish}>Finalizar Edição</button>
      {thumb.publicId && <CldImage src={thumb.publicId || ''} alt={thumb.publicId} width="500" />}
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('categories', fetchCategories);
  
  const session = await getServerSession(req, res, authOptions);
  
  if (session.user?.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  
  console.log('Session post =========>', session);
  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient)
    },
  };
};

export default CreatePosts;

