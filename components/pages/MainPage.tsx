import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostList from "@/components/lists/PostList";

function MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            커뮤니티에 오신 것을 환영합니다
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            다양한 주제에 대해 자유롭게 이야기하고 소통해보세요
          </p>
        </div>

        {/* Posts Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <div className="h-6 w-6 rounded bg-gradient-to-r from-blue-500 to-purple-500 mr-3"></div>
              최신 게시글
            </h2>
            <PostList />
          </div>

          {/* Write Post Button */}
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/post-write" className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>새 글 작성하기</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
