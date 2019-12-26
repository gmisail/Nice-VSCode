import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { createPost } from './post';

const shell = require('shelljs');
const api = require('nice-site');

export function activate(context: vscode.ExtensionContext) 
{
	let workingDirectory = "config.yaml";

	shell.config.execPath = shell.which('node').toString();
	
	if(vscode.workspace.workspaceFolders != undefined)
	{
		workingDirectory = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1];
	}

	shell.cd(path.join(workingDirectory));

	vscode.commands.registerCommand('extension.niceBuild', () => {
		if(fs.existsSync(path.join(workingDirectory, "config.yaml")))
		{
			shell.exec('haxelib run Nice build', (code : number, stdout : string, stderr : string) => {
				if(code == 0)
				{
					vscode.window.showInformationMessage("Build successful!");
				}
				else
				{
					vscode.window.showInformationMessage("Build unsuccessful. Make sure that all folders exist and try again.");
				}
			});
		}
		else
		{
			vscode.window.showErrorMessage("Build unsuccessful. Cannot find file named 'config.yaml'");
		}
	});

	vscode.commands.registerCommand('extension.nicePost', () => {
		if(fs.existsSync(path.join(workingDirectory, "_posts")))
		{
			shell.exec('haxelib run Nice create post ' + Date.now());
			
			vscode.window.showInformationMessage("Build successful!");
		}
		else
		{
			vscode.window.showErrorMessage("Cannot find directory named '_posts'");
		}
	});

	vscode.commands.registerCommand('extension.nicePage', () => {
		if(fs.existsSync(path.join(workingDirectory, "_pages")))
		{
			shell.exec('haxelib run Nice create page ' + Date.now());
			
			vscode.window.showInformationMessage("Build successful!");
		}
		else
		{
			vscode.window.showErrorMessage("Cannot find directory named '_pages'");
		}
	});

	vscode.commands.registerCommand('extension.niceLayout', () => {
		if(fs.existsSync(path.join(workingDirectory, "_layouts")))
		{
			shell.exec('haxelib run Nice create layout ' + Date.now());
			
			vscode.window.showInformationMessage("Build successful!");
		}
		else
		{
			vscode.window.showErrorMessage("Cannot find directory named '_layouts'");
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() 
{
	
}
