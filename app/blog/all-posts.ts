import { BlogHeader } from "@/app/types/blogpost";
import { CowboyPost } from "@/app/blog/cowboy/post";

export const blogPosts: BlogHeader[] = [
    CowboyPost
];

export function getBlogPost(slug: string): BlogHeader | undefined {
  return blogPosts.find(post => post.slug === slug);
} 