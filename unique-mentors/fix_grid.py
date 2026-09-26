import os

path = "components/ui/article-posts.tsx"
with open(path, "r") as f:
    content = f.read()

# Fix the grid container
content = content.replace(
    'className="grid h-auto grid-cols-1 gap-5 md:h-[650px] md:grid-cols-2 lg:grid-cols-[1fr_0.5fr]"',
    'className="grid h-auto grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"'
)

# Remove the isPrimary row span
content = content.replace(
    'isPrimary && "md:col-span-2 md:row-span-2 lg:col-span-1",',
    ''
)

with open(path, "w") as f:
    f.write(content)

print("Fixed ArticlePostsGrid grid layout")
