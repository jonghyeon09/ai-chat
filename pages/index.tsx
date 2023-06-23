import Layout from '@/components/chat/Layout';
import ChatSection from '@/components/chat/ChatSection';
import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo
        title="AI 채팅앱"
        description="KoGPT와 대화하는 사이트 입니다."
      />
      <Layout>
        <ChatSection />
      </Layout>
    </>
  );
}
