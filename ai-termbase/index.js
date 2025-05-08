const XLSX = require('xlsx');
const fs = require('fs-extra');

async function convertJsonToXlsx() {
    try {
        // 读取JSON文件
        const jsonData = await fs.readJson('./termbase.json');
        
        // 确保数据存在且格式正确
        if (!jsonData.termbase || !Array.isArray(jsonData.termbase)) {
            throw new Error('JSON数据格式不正确：缺少termbase数组');
        }

        // 创建工作簿
        const wb = XLSX.utils.book_new();
        
        // 设置列宽
        const colWidths = [
            { wch: 20 },  // 中文术语列宽
            { wch: 20 },  // 英文术语列宽
            { wch: 100 }, // 描述列宽
        ];
        
        // 添加表头
        const headers = ['中文术语', '英文术语', '描述'];
        
        // 将数据转换为工作表格式
        const wsData = [
            headers,
            ...jsonData.termbase.map(item => [
                item.term_zh || '',
                item.term_en || '',
                item.term_desc || ''
            ])
        ];
        
        // 创建工作表
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        
        // 设置列宽
        ws['!cols'] = colWidths;
        
        // 将工作表添加到工作簿
        XLSX.utils.book_append_sheet(wb, ws, "术语表");
        
        // 写入Excel文件
        XLSX.writeFile(wb, 'termbase.xlsx');
        
        console.log('转换完成！Excel文件已生成：termbase.xlsx');
    } catch (error) {
        console.error('转换过程中发生错误：', error);
    }
}

// 执行转换
convertJsonToXlsx();