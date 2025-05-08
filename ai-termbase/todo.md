# 任务描述

- [ ] 从 termbase.md 中提取术语表，并以 json 的形式输出到 termbase.json 中，json 的数据结构如下：

```json
{
    "termbase" : [
        {
            "term_zh" : "智能代理",
            "term_en" : "Agent",
            "term_desc" : "智能代理是一种自主 AI 系统，能够根据环境信息做出决策并执行任务。在 Dify 平台中，智能代理结合大语言模型的理解能力与外部工具的交互能力，可以自动完成从简单到复杂的一系列操作，如搜索信息、调用 API 或生成内容。"
        },
        ...
    ]
}
```

- [ ] 将 json 转化为 xlsx 文件
