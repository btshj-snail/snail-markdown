import MarkDown from '../markdown'

test('测试#的解析', ()=> {
    expect(MarkDown.resolve("# 这是一级标题")).toBe('<h1 id="这是一级标题">这是一级标题</h1>\n');
});

test('测试>的解析', ()=> {
    expect(MarkDown.resolve("> 这是引用")).toBe('<blockquote>\n<p>这是引用</p>\n</blockquote>\n');
});