import os

path = "next.config.js"
with open(path, "r") as f:
    content = f.read()

# Add redirect for /events to /event
redirects_insertion = """      { source: '/events', destination: '/event', permanent: true },
      { source: '/events/:slug*', destination: '/event/:slug*', permanent: true },
"""

# Insert right after `return [`
target = "return ["
if redirects_insertion not in content:
    content = content.replace(target, target + "\n" + redirects_insertion)

with open(path, "w") as f:
    f.write(content)

print("Updated next.config.js")
