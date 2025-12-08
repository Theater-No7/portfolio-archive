import { ArticleComparison } from "@/components/article-comparison"

// 🟢 追加：事前に生成するページのIDリストを定義します
// ここで定義したIDだけが、ビルド時にHTMLとして生成されます
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]
}

// 🟢 修正：Next.js 16向けに params を Promise として受け取る形に修正
export default async function ArticleDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <ArticleComparison articleId={id} />
      </main>
    </div>
  )
}