# Matcher
Generate regex from any string without using a language model, its just good old Javascript code.

# How does it work

Guide for using Matcher:

Matcher was designed to help you easily generate regular expressions from a string, including custom commands. Here's how you can use it:

Step 1: Define your string

First, define the string that you want to turn into a regular expression. This string can contain any text, including custom commands in the format %commandName[commandValue]. For example:

``const str = '[Maker+ was made with [%anyWord]]. This text will be turned into regex. [However this won't!] if numbers are in brackets like this [34] they will be turn into regex as well. %endsWith[goodbye!]';``

Step 2: Call generateRegexFromString

Call the generateRegexFromString function, passing in your string as a parameter. This will generate a regular expression based on your string.

``const regex = generateRegexFromString(str);``

This will generate something like:

``/Maker\+ was made with \w+\.\ \w\w\w\w\ \w\w\w\w\ \w\w\w\w\ \w\w\ \w\w\w\w\w\w\ \w\w\w\w\ \w\w\w\w\w\.\ However this won't!\ \w\w\ \w\w\w\w\w\w\w\ \w\w\w\ \w\w\ \w\w\w\w\w\w\w\w\ \w\w\w\w\ \w\w\w\w\ \d{2}$ they will be turn into regex as well.goodbye!/i``

Step 3: Use your regular expression

Now that you have a regular expression, you can use it however you like. For example, you might use it to test if a given string matches the pattern you defined:

``const myString = 'Maker+ was made with OpenAI. GPT-3.5 architecture. However this won't! No idea what this means. Goodbye!';
``const isMatch = regex.test(myString);``
``console.log(isMatch); // outputs: true``

Step 4: Optional - Customize your commands

If you want to customize the commands that generateRegexFromString supports, you can edit the commands object within the function. Each command should have a pattern property (which defines the regular expression pattern to use) and a replace function (which defines how to replace the matched string).

For example, here's how you might add a new command called %myCommand:

``const commands = {
  // existing commands here...
  myCommand: {
    pattern: '\\d{3}',
    replace: (part) => part,
  },
};``

This command would match any three-digit number and keep it as-is without any replacement.

Overall, the generateRegexFromString function is a powerful tool for creating regular expressions from strings, especially when you need to handle custom commands.




