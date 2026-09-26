import os

path = "next.config.js"
with open(path, "r") as f:
    lines = f.readlines()

new_lines = []
in_headers = False

for line in lines:
    if "async headers()" in line:
        in_headers = True
    if "async redirects()" in line:
        in_headers = False
    
    if in_headers and "destination:" in line and "permanent:" in line:
        continue # skip the wrongly inserted lines
    
    new_lines.append(line)

with open(path, "w") as f:
    f.writelines(new_lines)

print("Fixed next.config.js")
