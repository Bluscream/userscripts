from pprint import pprint
from os import environ
from pathlib import Path
from urllib.parse import unquote
from json import load

mpa = dict.fromkeys(range(32))
def strip_control_chars(s): return s.translate(mpa)
def fileStr(name, content): return f'{name}: "{strip_control_chars(content[:60])}"'
keepcharacters = (' ','.','_')
def save_userscript(name, content):
    name = "".join(c for c in name if c.isalnum() or c in keepcharacters).rstrip()
    with open(f"src/{name}.user.js", "w", encoding='utf-8') as f: f.write(content)
pathlist = Path("src/").glob('*.json')
for path in pathlist:
    try:
        filename = unquote(path.stem)
        with path.open(mode="r", encoding='utf-8') as f:
            json = load(f)
            print(fileStr(filename, json["Content"]))
            save_userscript(filename, json["Content"])
        path.unlink()
    except Exception as ex: print(f"Error: {ex}")