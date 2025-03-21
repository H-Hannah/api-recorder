// API 配置
export const API_CONFIG = {
    API_KEY: 'sk-',
    BASE_URL: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
    MODEL_NAME: 'qwen-plus'
};

// 提示词配置
export const PROMPTS = {
    ANALYZE_API: `
        作为资深的接口自动化测试专家，请全面分析：

        ### 输入数据
        {requestData}

        ### 请按以下格式输出分析结果：

        1. 接口基本信息（100字以内）
        - 接口名称/用途：
        - 请求方法：
        - 接口路径：
        - 所属模块/业务：

        2. 请求参数分析（100字以内）
        - 请求头部说明：
        - 请求参数详解：
        - 参数验证要点：

        3. 响应结果分析（200字以内）
        - 状态码说明：
        - 关键字段含义：
        - 响应数据结构：
        - 响应数据验证要点：

        4. 测试建议（200字以内）
        - 功能测试要点：
        - 边界条件测试：
        - 异常场景测试：
        - 性能测试建议：

        5. 可参考测试（用表格样式输出多条测试用例，包含用例名称、测试数据、测试步骤、断言方式、预期结果）

        请确保分析结果专业、完整且易于理解。对于复杂的参数或响应结构，请给出详细说明。
    `,
    GENERATION_CASE: `
        作为资深的接口自动化测试专家，请根据以下接口信息生成符合MeterSphere导入格式的测试用例集：

        ### 输入数据
        {requestData}

        ### 测试要求
        必须为每个接口生成至少4个测试用例，覆盖以下场景：
        1. 参数为空的场景
        2. 参数取正常值的场景
        3. 参数取边界值的场景
        4. 参数取异常值的场景

        ### 输出格式
        请严格按照以下 JSON 格式输出用例：

        GET 方法用例格式：
        {
            "name": "<用例名称>",
            "request": {
                "method": "GET",
                "header": [
                    {
                        "key": "<header_key>",
                        "value": "<header_value>"
                    }
                ],
                "url": {
                    "raw": "{{base_url}}<完整请求路径>",
                    "protocol": "https",
                    "host": ["{{base_url}}"],
                    "path": ["path1", "path2"],
                    "query": [
                        {
                            "key": "<param_key>",
                            "value": "<param_value>"
                        }
                    ]
                }
            }
        }

        POST 方法用例格式：
        {
            "name": "<用例名称>",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "<请求体JSON字符串>"
                },
                "url": {
                    "raw": "{{base_url}}<完整请求路径>",
                    "protocol": "https",
                    "host": ["{{base_url}}"],
                    "path": ["path1", "path2"]
                }
            }
        }

        ### 注意事项
        1. URL 路径中的参数使用 {{variable}} 格式
        2. 请求头中的认证信息使用变量格式
        3. 每个用例必须包含明确的用例名称，反映测试目的
        4. 对于复杂参数，需要考虑多种组合场景
        5. 确保生成的 JSON 格式完全符合 MeterSphere 导入规范
    `
};