import os

path = "components/admin/CourseEditorForm.tsx"
with open(path, "r") as f:
    content = f.read()

target = 'const [syllabus, setSyllabus] = useState((course?.syllabus ?? []).join("\\n"));'
replacement = 'const [syllabus, setSyllabus] = useState(course?.syllabus ?? "");'

content = content.replace(target, replacement)

with open(path, "w") as f:
    f.write(content)

print("Updated CourseEditorForm.tsx successfully.")
