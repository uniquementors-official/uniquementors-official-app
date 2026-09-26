import os

path = "app/(public)/blog/page.tsx"
with open(path, "r") as f:
    content = f.read()

content = content.replace('href: `/articles/${post.slug}`', 'href: `/blog/${post.slug}`')
content = content.replace('path: "/article"', 'path: "/blog"')
content = content.replace('title: "Medical Licensing Exam Article - Tips, News & Career Guides"', 'title: "Medical Licensing Exam Blog - Tips, News & Career Guides"')
content = content.replace('{ name: "Article", href: "/article" }', '{ name: "Blog", href: "/blog" }')
content = content.replace('href="/article"', 'href="/blog"')
content = content.replace('href={`/article?category=${encodeURIComponent(item)}`}', 'href={`/blog?category=${encodeURIComponent(item)}`}')

with open(path, "w") as f:
    f.write(content)

print("Updated blog page")
