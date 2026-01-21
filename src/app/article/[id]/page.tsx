
import { MOCK_POSTS } from '@/lib/constants';
import { ArticleDetailView } from '@/components/templates/ArticleTemplates';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = MOCK_POSTS.find(p => p.id === id);
  
  if (!post) {
    notFound();
  }

  return <ArticleDetailView post={post} />;
}
