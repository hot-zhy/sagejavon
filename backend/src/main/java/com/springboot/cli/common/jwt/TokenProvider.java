package com.springboot.cli.common.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * description token管理
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class TokenProvider {

    // 解析 token 并返回一个 Map，其中包含 token 中的所有信息
    public static Map<String, Object> decodeTokenToMap(String token, String publicKey) {
        try {
            Claims claims = Jwts.parser()
                    // 设置签名的秘钥
                    .setSigningKey(publicKey.getBytes(StandardCharsets.UTF_8))
                    // 设置需要解析的jwt
                    .parseClaimsJws(token).getBody();
            Map<String, Object> data = new HashMap<>();
            data.put("userId", claims.get("userId", String.class));
            data.put("name", claims.get("name", String.class));
            return data;
        } catch (Exception e) {
            throw new RuntimeException("Error decoding token", e);
        }
    }
}
