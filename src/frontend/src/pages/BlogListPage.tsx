import React, { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllBlogPosts, useGetAllCategories, useGetAllTags } from '../hooks/useBlog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Calendar, Tag, FolderOpen, Search, X } from 'lucide-react';
import PageTransition from '../components/site/PageTransition';

export default function BlogListPage() {
  const navigate = useNavigate();
  const { data: posts = [], isLoading } = useGetAllBlogPosts();
  const categories = useGetAllCategories();
  const tags = useGetAllTags();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    if (selectedCategory) {
      filtered = filtered.filter(post => post.categories.includes(selectedCategory));
    }

    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => Number(b.blogPostId) - Number(a.blogPostId));
  }, [posts, selectedCategory, selectedTag, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory || selectedTag || searchQuery;

  return (
    <PageTransition>
      <div className="container max-w-7xl py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
            <BookOpen className="h-10 w-10" />
            Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Insights, updates, and stories from Prasad Enterprise
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </CardContent>
            </Card>

            {categories.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    >
                      {category}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}

            {tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTag === tag ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">No blog posts found</p>
                  <p className="text-muted-foreground">
                    {hasActiveFilters
                      ? 'Try adjusting your filters or search query.'
                      : 'Check back soon for new content!'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map(post => (
                  <Card
                    key={Number(post.blogPostId)}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigate({ to: `/blog/${post.blogPostId}` })}
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          By {post.author}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.categories.map(category => (
                            <Badge key={category} variant="secondary">
                              <FolderOpen className="h-3 w-3 mr-1" />
                              {category}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="outline">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <Button variant="link" className="p-0 h-auto">
                        Read more →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
