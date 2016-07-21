/********************** 作业二 *************************/ 
var request = require('request');

function requestFun(URL){
	return new Promise(function (resolve, reject){
		request(URL,function(error, response, data){
			if (!error && response.statusCode == 200) {
				resolve(data);
			}else{
				reject(error);
			}
		})
	})
};

var reqInfo = {
    getUserId: function () {
    	return requestFun('http://demos.so/result/homework.promise.userInfo').then(function(data){
			return JSON.parse(data)['_id'];
		})
    },
    getUserStudy : function(){
    	return this.getUserId().then(function(id){
			return requestFun('http://demos.so/result/student='+ id).then(JSON.parse);
    	});
    },
    getUserIssue : function(){
    	return this.getUserId().then(function(id){
			return requestFun('http://demos.so/result/userid='+ id).then(JSON.parse);
    	});
    },
    promiseAll : function(){
    	return Promise.all([this.getUserStudy(),this.getUserIssue()])
    },
    promiseRace : function(){
		return Promise.race([this.getUserStudy(),this.getUserIssue(),this.reqTimeout()]);   	
    },
    reqTimeout : function(){
    	return new Promise(function(resolve,reject){
    		setTimeout(function(){
    			resolve("您的请求超时了~~~~~~~~~~~~~~~~");
    		},200);
    	})
    }
}

/**
	promise.all 
	用户发布的帖子和用户学习帖子同时并行请求 
*/
// reqInfo.promiseAll().then(function(value){
// 	console.log("用户学习过的帖子：\n");
// 	console.log(value[0]);
// 	console.log("用户发布的帖子：\n");
// 	console.log(value[1]);
// },function(error){
// 	console.log(error);
// }).catch(function(error){
// 	conosle.log(error);
// })


/**
	promise.race 
	用户发布的帖子和用户学习帖子同时并行请求 
*/
reqInfo.promiseRace().then(function(value){
	console.log("请求快的先显示：");
	console.log(value);
},function(error){
	console.log(error);
}).catch(function(error){
	conosle.log(error);
})
