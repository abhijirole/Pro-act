const { textChangeRangeIsUnchanged, Extension } = require('typescript');
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require("fs");

/* ##STATUSBAR:EDIT:ALWAYS statusbar message here */


// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate (context) {



	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "demo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('demo.helloWorld', async function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Welcome to AJs Extension!');



		vscode.workspace.onDidOpenTextDocument(e => showMessages(e))
		vscode.workspace.onDidSaveTextDocument(e => showMessages2(e))

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate () { }

function showMessages (event) {
	var text = event.getText()
	// console.log("after open", text)
	let re = new RegExp('(--|//|/\*)\\s*~~(MSG):?\\s+(.*)');
	let match
	match = re.exec(text)
	if (match != null) {
		let str = match[0].substr(match[0].indexOf(":") + 1)
		let firstMSg = str.split("~~")[0]
		let re2 = new RegExp('(--|//|/\*)\\s*~~(CONTACT):?\\s+(.*)');
		if (re2.exec(match[0]) != null) {

			vscode.window.showErrorMessage(firstMSg + '\r\n' + "CONTACT PERSON:-" + re2.exec(match[0])[3], { modal: true })
		} else {
			vscode.window.showErrorMessage(firstMSg + '\r\n', { modal: true })

		}
	}

}
function showMessages2 (event) {
	var text = event.getText()
	// console.log("after open", text)
	let re = new RegExp('(--|//|/\*)\\s*~~(MSG):?\\s+(.*)');
	let match
	match = re.exec(text)
	if (match != null) {
		let str = match[0].substr(match[0].indexOf(":") + 1)
		let firstMSg = str.split("~~")[0]
		vscode.window.showInformationMessage(firstMSg + '\r\n')

	}

}
exports.activate = activate;

module.exports = {
	activate,
	deactivate
}
