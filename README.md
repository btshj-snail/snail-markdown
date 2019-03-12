# snail-markdown
解析markdwon,并且生成对应的html文件.

## 安装

````
npm install @runningsnail/markdown -g
````

## 命令行 

snailMarkdown resolve <source> <target> <template>

- source 将要扫描的文件夹路径.会扫描指定的文件夹下的所有.md文件.
- target 生成的html的存放文件夹路径.将会按照source下的文件夹层级来进行放置.
- template 将要生成的html的模板.主要用于标注引用的css和js.请不要在body标签内书写内容,这样会被覆盖掉.

````
snailMarkdown resolve ./static/ ./static/doc  ./docTemplateHtml

````
