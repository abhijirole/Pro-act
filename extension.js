const { textChangeRangeIsUnchanged, Extension } = require('typescript');
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require("fs");
// ##ERROR:ALWAYS This is a test error message that will be shown to anyone who opens the file.
// this method is called when your extension is activated

// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "demo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('demo.helloWorld',async function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Welcome to AJs Extension!');
		////1 START
		// vscode.window.showInputBox()
		// const act=vscode.window.activeTextEditor
		// if(!act){
		// 	vscode.window.showErrorMessage("not active")
		// 	return
		// }
		
		// const text=act.document.getText(act.selection)
		// vscode.window.showInformationMessage(`"user text:-", ${text}`)
		//// 1 END


		////2 START
		// vscode.workspace.onDidChangeTextDocument(event=>{
		// 	console.log("eafasfasdfsdfasd",event, event.document.fileName)
		// })
		 
		const files =await vscode.workspace.findFiles(
			"**/abc.js*",
			"**/node_modules/**"
		  );

		  console.log("Files", files)
		var filepath=""
		  files.forEach((file) => {
			fs.readFile(file.fsPath, function read(err, data) {
			  if (err) {
				throw err;
			  }
			  const content = data;
			  console.log("content", content.toString("utf8").split("\n"))
			//   processFile(content);
			var file= content.toString("utf8").split("\n")
			filepath=file[0]
			});
	
			// if (errOccuredCount > 0) {
			//   vscode.window.showInformationMessage(
			// 	"I am still in devolopement mode :( some repos not downloaded ErrCount:" +
			// 	errOccuredCount
			//   );
			// } else {
			//   vscode.window.showInformationMessage(
			// 	"Github Repos Scanned Succesfully ! "
			//   );
			// }
		  });


		  vscode.workspace.onDidOpenTextDocument(event=>{
			  console.log("Open DOcument", event)
				vscode.window.showWarningMessage("Please cofirm your changes ");
			  

		  })
		  await vscode.workspace.onDidSaveTextDocument(event2=>{
			// console.log("save event for file", event2.fileName, filepath)
			var name=filepath.replace(/(")/, ' ')
			var name2=name.replace(/(")/, ' ')
			var fileName2=event2.fileName.toString()
			console.log(typeof( fileName2.toLocaleLowerCase()), typeof(name2.toLocaleLowerCase()))
			console.log(  name2.toLocaleLowerCase(), fileName2.toLocaleLowerCase())
			// if(event2.fileName.toString().toLocaleLowerCase()==name2.toLocaleLowerCase())	{
			// 	console.log("called")
			// 	 vscode.window.showInformationMessage('Take a permission before change to this file');
			// }
			if (name2.toLocaleLowerCase().includes(fileName2.toLocaleLowerCase())===true){
				vscode.window.showWarningMessage("This file added as a secure file please verify before merge ");
				// vscode.window.showOpenDialog("abc":"asd":"/asdasd")
				// vscode.window.showInformationMessage(`'File path:-', ${name2}`);
				vscode.window.showSaveDialog()
				console.log("Yes GOt it")
			}else{
				
				console.log("Yes NOT GOt it")
			}
		})

		////2 END

		// 3 NOT Working Yet
		const Quickpack=vscode.window.createQuickPick()

		Quickpack.onDidChangeSelection(event=>{
			console.log("called",)
			if(event){

				vscode.window.showInformationMessage('please dont change anything');
			}
			vscode.window.showInformationMessage('please dont change anythin22g');
		})	
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
