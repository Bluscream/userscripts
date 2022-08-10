from github import Github, GistFile, Gist
from pprint import pprint
from os import environ

mpa = dict.fromkeys(range(32))
def strip_control_chars(s): return s.translate(mpa)
def getFileURL(gist: Gist, file: GistFile):
    # https://gist.github.com/Bluscream/0ac506f36795951962492785a9626132#file-faviconlinks-user-js
    # https://gist.githubusercontent.com/Bluscream/c1b14be52a20b54433ba46a4c26aed41/raw/ae27d558a9049e5d8b61062cfda65f01af666b63/update-all.ps1
    return f"// @originalURL\t{gist.html_url}#file-{file.filename.replace('.', '-')}"
def save_userscript(gist: Gist, file: GistFile):
    with open(f"src/{file.filename}", "wb") as text_file:
        text_file.write(file.content.encode("utf-8") + "\n\n".encode("utf-8") + getFileURL(gist,file).encode("utf-8"))
def fileStr(gist: Gist, file: GistFile): return f"{gist.description}: {file.filename} [{strip_control_chars(file.content[:20])}]"
g = Github(environ.get("GITHUB_TOKEN"))
userscripts = []
gists = 0
for gist in g.get_user().get_gists():
    gists+=1
    file: GistFile
    try:
        for name, file in gist.files.items():
            try:
                if file.filename.lower().endswith(".user.js"):
                    print(fileStr(gist, file))
                    isModified = not file.content.startswith("// ==UserScript==")
                    if not isModified:
                        save_userscript(gist, file)
                        userscripts.append(file)
                    else: print(f"{gist.description}: {file.filename} is modified!")
            except Exception as ex: print(ex)
    except Exception as ex: print(ex)
    
print(f"Found {len(userscripts)} userscripts in {gists} gists")