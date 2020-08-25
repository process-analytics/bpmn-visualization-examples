#! /bin/bash
set -e

############################################################
# update all html files in the examples folder
############################################################
if [ $# -ne 1 ]; then
	echo "Mandatory parameter <new_version> missing."
	exit 1
fi
NEW_VERSION=$1
echo "Updating examples to make them use demo@$NEW_VERSION"

SCRIPT_DIRECTORY="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
EXAMPLES_DIRECTORY="$SCRIPT_DIRECTORY/../examples"
pushd "$EXAMPLES_DIRECTORY" > /dev/null

echo "Search for files in $(pwd)"
# lines to update contains substring like "/demo/0.1.6/"
if [[ "$OSTYPE" == "darwin"* ]]; then
	sed -i '' -E "s/\/demo\/[0-9].[0-9].[0-9]/\/demo\/$NEW_VERSION/#" **/*.{html,md,js} *.{html,js}
else
	sed -i -E "s/\/demo\/[0-9].[0-9].[0-9]/\/demo\/$NEW_VERSION/#" **/*.{html,md,js} *.{html,js}
fi

echo "Files updated"
popd > /dev/null
pwd
