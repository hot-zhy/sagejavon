package com.springboot.cli.common.utils;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class ChatGLMClient {

    private static final String API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
    private static final String API_KEY = "6e5294aa63fa49d186f994c849e1def8.detSDLFawmdzZKV2"; // 替换成你的 key

    public static List<String> callChatGLM(String prompt) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            String requestJson = mapper.writeValueAsString(Map.of(
                    "model", "glm-4",
                    "messages", List.of(Map.of("role", "user", "content", prompt)),
                    "stream", false,
                    "temperature", 0.7,
                    "top_p", 0.9,
                    "response_format", Map.of("type", "json_object")
            ));

            HttpPost post = new HttpPost("https://open.bigmodel.cn/api/paas/v4/chat/completions");
            StringEntity entity = new StringEntity(requestJson, ContentType.APPLICATION_JSON);
            post.setEntity(entity);
            post.setHeader("Authorization", "Bearer " + API_KEY);

            try (CloseableHttpClient client = HttpClients.createDefault();
                 CloseableHttpResponse response = client.execute(post)) {

                Map<String, Object> result = mapper.readValue(response.getEntity().getContent(), Map.class);
                String content = ((Map<String, Object>) ((List<?>) result.get("choices")).get(0)).get("message").toString();

                // 简单从 content 中提取字符串数组（可使用正则或 json 解析）
                Pattern pattern = Pattern.compile("\\[(.*?)\\]");
                Matcher matcher = pattern.matcher(content);
                if (matcher.find()) {
                    String listStr = matcher.group(1);
                    return Arrays.stream(listStr.split(","))
                            .map(s -> s.replaceAll("[\"\\s]", ""))
                            .collect(Collectors.toList());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ArrayList<>();
    }


    public static String askModel(String prompt) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        // 构建请求体
        String requestJson = mapper.writeValueAsString(Map.of(
                "model", "glm-4",
                "messages", List.of(Map.of("role", "user", "content", prompt)),
                "stream", false,
                "temperature", 0.7,
                "top_p", 0.9,
                "response_format", Map.of("type", "json_object")
        ));

        // 发送请求
        HttpPost post = new HttpPost(API_URL);
        StringEntity entity = new StringEntity(requestJson, "UTF-8");
        entity.setContentType("application/json");
        post.setEntity(entity);
        post.setHeader("Authorization", "Bearer " + API_KEY);

        try (CloseableHttpClient client = HttpClients.createDefault();
             CloseableHttpResponse response = client.execute(post)) {

            Map<String, Object> result = mapper.readValue(response.getEntity().getContent(), Map.class);
            Map<String, Object> choice = ((List<Map<String, Object>>) result.get("choices")).get(0);
            Map<String, Object> message = (Map<String, Object>) choice.get("message");
            return message.get("content").toString();
        }
    }
}
