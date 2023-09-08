#! /bin/bash
set -e

function replaceVersion() {
  directory=$1
  pushd "$directory" > /dev/null
  echo "Search for files in $(pwd)"

  rexep_npm="s/\"bpmn-visualization\": \".*\"/\"bpmn-visualization\": \"$NEW_VERSION\"/"
  # lines to update contains substring like "bpmn-visualization@x.y.z/bpmn-visualization.min.js" integrity="xxxxx"
  rexep_others="s/\/bpmn-visualization@.*\/dist\/bpmn-visualization.min.js\" integrity=\".*\"/\/bpmn-visualization@$NEW_VERSION\/dist\/bpmn-visualization.min.js\" integrity=\"$ESCAPED_INTEGRITY\"/"

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
      sed -i -E "${rexep_others}#" **/*.{html,md}
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
if [ $# -ne 2 ]; then
	echo "At least one mandatory parameter is missing missing."
	echo "Parameters order: <new_version> <integrity>"
	exit 1
fi
NEW_VERSION=$1
INTEGRITY=$2
echo "Updating examples to make them use bpmn-visualization@$NEW_VERSION with integrity: $INTEGRITY"

ESCAPED_INTEGRITY=$(echo "$INTEGRITY" | sed 's;/;\\/;g')
echo "ESCAPED_INTEGRITY for usage in regex: $ESCAPED_INTEGRITY"

SCRIPT_DIRECTORY="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

replaceVersion "$SCRIPT_DIRECTORY/../demo"
replaceVersion "$SCRIPT_DIRECTORY/../examples"
replaceVersion "$SCRIPT_DIRECTORY/../projects"
