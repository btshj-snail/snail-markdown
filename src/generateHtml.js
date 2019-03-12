/*
 * @Author: snail 
 * @Date: 2019-03-11 13:36:50 
 * @Last Modified by: snail
 * @Last Modified time: 2019-03-12 09:53:40
 */

const path = require('path');
const fs = require('fs');
const marked = require('./marked')


function deleteAllChildren(path) {
	var files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteAllChildren(curPath);
                fs.rmdirSync(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
            }
            
		});
		
    }
}

function mkdirsSync(dirname) {  
    if (fs.existsSync(dirname)) {  
        return true;  
    } else {  
        if (mkdirsSync(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }  
    }  
}  


let htmlTemplate = "";
const generateHtml = {
    /**
     * 扫描指定文件夹下的所有文件
     * @param {*} folder 指定文件夹
     * @param {*} excludeFolder 无需扫描的目录名称
     * @param {*} includeSuffix 需要扫描的文件后缀.不指定则是扫描全部文件.
     */
    scan(folder, excludeFolder, includeSuffix) {
        includeSuffix = includeSuffix || [];
        if (typeof includeSuffix === 'string') {
            includeSuffix = [includeSuffix];
        }

        excludeFolder = excludeFolder || [];
        if (typeof excludeFolder === 'string') {
            excludeFolder = [excludeFolder];
        }
        let enable = true;
        excludeFolder.forEach(exclude => {
            if (folder.endsWith(exclude)) {
                enable = false;
                return;
            }
        })

        if (!enable) return [];

        let stat = fs.statSync(folder);
        if (!stat.isDirectory()) return [];
        let result = [],
            files = [];
        try {
            files = fs.readdirSync(folder)
        } catch (ex) {
            console.error(ex);
        }
        files.forEach(item => {
            let filedir = path.join(folder, item);
            let stat = fs.statSync(filedir);
            let isFile = stat.isFile();
            let isDirectory = stat.isDirectory();
            if (isFile) {
                if (includeSuffix.length <= 0) result.push(filedir);
                else {
                    includeSuffix.forEach((suffix) => {
                        if (path.extname(filedir) === "." + suffix) {
                            result.push(filedir);
                        }

                    })
                }
            }
            if (isDirectory) {
                let _r = arguments.callee(filedir, excludeFolder, includeSuffix);
                result = result.concat(_r);
            }
        })
        return result;
    },

    /**
     * 生成文件
     * @param {*} targetFolder 
     * @param {*} fileName 
     * @param {*} content 
     */
    generateFile(generatePath, content) {
        return new Promise((resolve,reject)=>{
            const data = new Uint8Array(Buffer.from(content));
            fs.writeFile(generatePath, data, (err) => {
                if (err){
                    console.error("生成文件:"+generatePath+'> ERROE!');
                    reject(err);
                }else{
                    console.log("生成文件:"+generatePath+'> OK!');
                    resolve();
                }
            });
        });
        
    },
    resolveFile(filePath,backFun){
        return new Promise((resolve,reject)=>{
            fs.readFile(filePath,{encoding:'utf-8'},(err,data)=>{
                if(err){ reject(err) }
                let content = marked(data);
                let result = htmlTemplate.replace(/(<body[^>]*>?)([\s\S]*)(<\/body>)/gi,(a,a1,a2,a3)=>{
                    return a1+'\n'+content +'\n'+a3;
                })
                resolve(result);
            })
        })
        
    }
}

function deal(scanFolder,targetFolder,templatePath){
    scanFolder = path.resolve(scanFolder)
    targetFolder = path.resolve(targetFolder)
    templatePath = path.resolve(templatePath);

    if(!htmlTemplate){
        try{
           htmlTemplate = fs.readFileSync(templatePath,{encoding:'utf-8'});
        }catch(ex){
            throw ex;
        }
       
    }


    deleteAllChildren(targetFolder)
    console.log('清空目标文件夹,OK!')
    let result = generateHtml.scan(scanFolder, ['node_modules', '.git'], 'md');
    
    let promiseAry = []
    result.forEach((filePath)=>{
        let _p = generateHtml.resolveFile(filePath)
        .then(content=>{
            let name = path.basename(filePath,'.md')
            let relativeFolder = path.dirname(filePath).replace(scanFolder,'');
            let generateFolder = path.join(targetFolder,relativeFolder);
            mkdirsSync(generateFolder)
            let generatePath = path.join(generateFolder,name+'.html');
            return generateHtml.generateFile(generatePath,content);
        })
        .catch(ex=>{
            throw ex;
        })
        promiseAry.push(_p)
    })
    Promise.all(promiseAry)
    .then(data=>{
        console.log('Over and OK!')
    })
    .catch(ex=>{
        console.log('Over and Error!')
    })
    
}


module.exports = {deal}

