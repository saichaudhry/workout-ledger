#!/bin/zsh
cd "$(dirname "$0")" || exit 1
if ! npx expo whoami; then
  npx expo login || exit 1
fi
npx expo start --port 8082
