import { Sidebar } from "@/components/sidebar"
import { ArticleTable } from "@/components/article-table"
import { Header } from "@/components/header"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background dark">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <ArticleTable />
        </main>
      </div>
    </div>
  )
}
