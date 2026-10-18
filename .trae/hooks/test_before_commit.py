import json
import re
import subprocess
import sys

try:
    event = json.load(sys.stdin)
    command = event.get("tool_input", {}).get("command", "")

    # 识别常见的直接 git commit 命令
    # 不覆盖 alias、包装脚本、git -C 等全部变体
    if not re.search(r"\bgit\s+commit\b", command):
        sys.exit(0)

    result = subprocess.run(
        ["npm", "run", "test:unit"],
        stdin=subprocess.DEVNULL,
        stdout=sys.stderr,
        stderr=sys.stderr,
        timeout=110,
        check=False,
    )

    if result.returncode != 0:
        print("单元测试失败：请先修复，暂不允许提交。", file=sys.stderr)
        sys.exit(2)

except Exception as exc:
    print(f"提交前测试检查失败：{exc}", file=sys.stderr)
    sys.exit(2)