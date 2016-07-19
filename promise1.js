var fs = require('fs');

function writeFile(){
	return new Promise(function(resolve,reject){
		var data = "写入数据到file.txt文件中";
		fs.writeFile('file.txt',data,'utf-8',function(err){
			if(err){
				reject(new Error(err));
				return;
			}

			resolve();
		});
	})
}
function appendFile(){
	return new Promise(function(resolve,reject){
		var data = "\n\n追加数据到file.txt文件中";
		fs.appendFile('file.txt',data,'utf-8',function(err){
			if(err){
				reject(new Error(err));
				return;
			}

			resolve();
		})
	});
}

function readFile(){
	return new Promise(function(resolve,reject){
		fs.readFile('file.txt','utf-8',function(err,data){
			if(err){
				reject(new Error(err));
			}else{
				console.log(data);
			}
		})
	});
}



var promise = Promise.resolve();
promise.then(writeFile)
			.then(appendFile)
			.then(readFile)
			.catch(function(error){
				console.log("抛出异常："+ error);
			})