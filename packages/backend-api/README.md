```sh
# Dev
wrangler dev --persist-to ../../.wrangler/state --port 8686

curl http://localhost:8686/v1/tasks/create \
  -X POST \
  -d '{"taskName": "野菜を買う"}'

curl http://localhost:8686/v1/tasks/create \
  -X POST \
  -d '{"taskName": "肉を買う", "taskDescription": "牛肉と豚肉を買う"}'

wrangler d1 execute app-sample-db  --local --persist-to ../../.wrangler/state --command "SELECT * FROM tasks"
```
