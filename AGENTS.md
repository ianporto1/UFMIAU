<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:browser-rules -->
# Never open a browser

You are STRICTLY FORBIDDEN from using the `browser_subagent` tool under any circumstances. Do not open, navigate, or interact with any browser. Verify changes by reading files, checking logs, or running terminal commands instead.
<!-- END:browser-rules -->

<!-- BEGIN:git-rules -->
# Always commit after completing a task

After finishing any task or set of changes, you MUST run `git add -A` and `git commit` with a concise, descriptive message in English. Never leave changes uncommitted at the end of a task.
<!-- END:git-rules -->

<!-- BEGIN:testing-rules -->
# Never run tests without explicit user permission

Do NOT run tests, invoke functions, execute curl commands, or perform any kind of verification/testing unless the user explicitly asks you to. Do not suggest running tests either. Just make the code changes and leave testing to the user.
<!-- END:testing-rules -->
