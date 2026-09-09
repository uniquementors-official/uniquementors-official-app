import re

with open("next.config.js", "r") as f:
    content = f.read()

new_redirects = """
      // Old single root pages
      { source: "/prometric-exam-for-physiotherapist", destination: "/courses?profession=Physiotherapist", permanent: true },
      { source: "/prometric-exam-for-physiotherapist/", destination: "/courses?profession=Physiotherapist", permanent: true },
      { source: "/dha-coaching-centre", destination: "/courses/dha-exam-training", permanent: true },
      { source: "/dha-coaching-centre/", destination: "/courses/dha-exam-training", permanent: true },
      { source: "/prometric-exam-for-lab-technician", destination: "/courses?profession=Lab%20Technician", permanent: true },
      { source: "/prometric-exam-for-lab-technician/", destination: "/courses?profession=Lab%20Technician", permanent: true },
      { source: "/haad-exam-for-lab-technician", destination: "/courses/haad-exam-training", permanent: true },
      { source: "/haad-exam-for-lab-technician/", destination: "/courses/haad-exam-training", permanent: true },
      { source: "/moh-exam-for-physiotherapist", destination: "/courses/moh-exam-training", permanent: true },
      { source: "/moh-exam-for-physiotherapist/", destination: "/courses/moh-exam-training", permanent: true },
"""

# Insert before the catch-all dynamic redirects at the end
content = content.replace(
    '      {\n        source: "/article.php",',
    new_redirects + '      {\n        source: "/article.php",'
)

with open("next.config.js", "w") as f:
    f.write(content)
