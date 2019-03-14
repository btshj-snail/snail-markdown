/*
 * @Author: snail 
 * @Date: 2019-03-14 14:55:50 
 * @Last Modified by: snail
 * @Last Modified time: 2019-03-14 14:59:31
 *  对html字符串进行再次解析,以及逻辑处理.
 */
const snailMarkedAgain = {
    resolve(data){
        return snailMarkedAgain.replaceRelativeMdPathInEl_a(data)
    },
    /**
     * 替换a标签里面的href属性值.
     * 如果href属性值是相对路径,证明他想连接的是本地md文件,正将其指向对应的html文件
     * @param {*} data 
     */
    replaceRelativeMdPathInEl_a(data){
        return (data||"").replace(/(<a.+?href=[\"\'])(.+?)([\"\'].*>[\s\S]*<\/a>)/gi,(a,a1,a2,a3)=>{
            var content = a2;
            if(/^(\.|\/).*(\.md|\.MD)$/gi.test(a2)){
                content = a2.replace(/^(\.|\/)(.*?)(\.md|\.MD)$/,(aa,aa1,aa2,aa3)=>{
                    return aa1+aa2+".html"
                })
            }
            return a1 + content + a3
        })
    }
}

const markedAgain = snailMarkedAgain.resolve;

module.exports = markedAgain;