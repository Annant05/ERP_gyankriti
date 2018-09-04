@ECHO OFF
ECHO "MY COMMAND LINE BATCH SCRIPT"
SET CurrentDir="%~dp0"
ECHO The current file path this bat file is executing in is the following:
ECHO %CurrentDir%
cd %CurrentDir%
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb