#! /bin/bash
set -e

function replaceVersion() {
  directory=$1
  pushd "$directory" > /dev/null
  echo "Search for files in $(pwd)"

  rexep_npm="s/\"bpmn-visualization\": \".*\"/\"bpmn-visualization\": \"$NEW_VERSION\"/"
  # lines to update contains substring like "bpmn-visualization@x.y.z"
  rexep_others="s/\/bpmn-visualization@.*\/dist/\/bpmn-visualization@$NEW_VERSION\/dist/"

  if [[ "$OSTYPE" == "darwin"* ]]; then
    if [[ $directory == *demo ]]; then
      sed -i '' -E "${rexep_others}" **/*.{html,md,js}
    elif  [[ $directory == *projects ]]; then
      sed -i '' -E "${rexep_npm}" **/package.json
    else
      sed -i '' -E "${rexep_others}" **/**/*.{html,md,js}
    fi
  else
    if [[ $directory == *demo ]]; then
      sed -i -E "${rexep_others}#" **/*.{html,md,js}
    elif [[ $directory == *projects ]]; then
      sed -i -E "${rexep_npm}#" **/package.json
    else
      sed -i -E "${rexep_others}#" **/**/*.{html,md,js}
    fi
  fi

  echo "Files updated"
  popd > /dev/null
}


############################################################
# update all html files in the examples folder
############################################################
if [ $# -ne 1 ]; then
	echo "Mandatory parameter <new_version> missing."
	exit 1
fi
NEW_VERSION=$1
echo "Updating examples to make them use bpmn-visualization@$NEW_VERSION"

SCRIPT_DIRECTORY="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

replaceVersion "$SCRIPT_DIRECTORY/../demo"
replaceVersion "$SCRIPT_DIRECTORY/../examples"
replaceVersion "$SCRIPT_DIRECTORY/../projects"
