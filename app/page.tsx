"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { blogPosts } from "@/lib/posts"

export default function Home() {
  const recentPosts = blogPosts.slice(0, 3)

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl font-bold text-black mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            John Peng
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Code Enthusiast
          </motion.p>
        </motion.div>

        <section className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-2xl font-semibold text-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Recent Posts
          </motion.h2>
          <div className="space-y-6">
            {recentPosts.map((post, index) => (
              <motion.article 
                key={post.slug} 
                className="border-b border-gray-200 pb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.1, // Staggered animation
                }}
              >
                <Link 
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <motion.h3 
                    className="text-xl font-semibold text-black mb-2 group-hover:text-gray-600"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {post.title}
                  </motion.h3>
                  <time className="text-gray-500 text-sm mb-2 block">
                    {post.date}
                  </time>
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {post.excerpt}
                  </motion.p>
                </Link>
              </motion.article>
            ))}
          </div>
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link 
              href="/blog"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              View all posts →
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  )
}