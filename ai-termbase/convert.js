const fs = require('fs-extra');

// 读取markdown文件
const markdown = fs.readFileSync('termbase.md', 'utf8');

// 初始化结果数组
const termbase = [];

// 分割为行
const lines = markdown.split('\n');

let currentTerm = null;

// 处理每一行
for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 跳过空行和章节标题
    if (!line || line.startsWith('# ') || line.startsWith('## ')) {
        continue;
    }
    
    // 检测术语行（以 ### 开头）
    if (line.startsWith('### ')) {
        // 如果有之前的术语，保存它
        if (currentTerm) {
            termbase.push(currentTerm);
        }
        
        // 解析术语行
        const termLine = line.substring(4);
        const matches = termLine.match(/^(.+?)（(.+?)）$/);
        
        if (matches) {
            currentTerm = {
                term_zh: matches[1],
                term_en: matches[2],
                term_desc: ''
            };
        }
    } 
    // 如果不是术语行且有当前术语，则为描述
    else if (currentTerm) {
        if (currentTerm.term_desc) {
            currentTerm.term_desc += ' ' + line;
        } else {
            currentTerm.term_desc = line;
        }
    }
}

// 添加最后一个术语
if (currentTerm) {
    termbase.push(currentTerm);
}

// 写入JSON文件
fs.writeJsonSync('termbase.json', { termbase }, { spaces: 2 });

console.log('转换完成！已生成 termbase.json 文件');