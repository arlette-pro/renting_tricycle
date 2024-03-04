!#bin/bash

export URL=http://localhost:8000/api/user
echo $URL
## Create user
# curl -H 'Content-Type: application/json' \
#       -d '{ "name": "john", "email": "john@doe.com", "role": "Admin" }'  \
#       -X POST \
#       $URL

## Fetch all users
curl -X GET  $URL