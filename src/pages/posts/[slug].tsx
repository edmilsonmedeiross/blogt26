import axios from 'axios';
import { GetStaticPropsContext } from 'next';
import { useState } from 'react';
import client from '@/services/prismadb';
import Header from '@/components/Header';
import { PostProps } from '@/types/Post'; 

// ikarusj
function DetailPost({ post: postProp }: { post: string }) {
  const [post] = useState(JSON.parse(postProp) as PostProps);
  console.log('post =======>', post);

  return (
    <>
      <Header />
      <div
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <img src={ post.thumb } alt="" />
    </>
  );
}

type Params = {
  slug: string;
}

interface PostSlug {
  slug: string;
}

export const getStaticPaths = async () => {
  const posts: PostSlug[] = await client.posts.findMany({
    where: {
      published: true,
    },
    select: {
      slug: true,
    },
  });

  const paths = posts.map((post: PostSlug) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

interface errProps{
  message: string;
}

interface ressProps {
  data: {
    post: string;
  };
}

export const getStaticProps = async (context: GetStaticPropsContext<Params>
  ) => {
  const { params } = context;
  const { slug } = params as Params;

  const post = await axios.get(`${process.env.NEXTAUTH_URL as string}/api/posts/${slug}`)
    .then((res: ressProps) => JSON.stringify(res.data.post))
    .catch((err: errProps) => {
      console.log('error =======>', err.message);
      return false;
    });

  const sixty = 60;
  const twentyFour = 24;

  return {
    props: {
      slug,
      post,
    },
    revalidate: sixty * sixty * twentyFour, // 24 hours
  };
};

export default DetailPost;
