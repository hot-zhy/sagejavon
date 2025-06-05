package com.springboot.cli.common.utils;

import com.springboot.cli.model.DO.StudentDO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtil {

    public static String getToken(StudentDO student,Long ttlMillis,String publicKey) {
        // 生成JWT
        return Jwts.builder()
                .setSubject(student.getId()) // 设置JWT的主体为用户ID
                .setIssuedAt(new Date()) // 设置JWT的生成时间
                .setExpiration(new Date(System.currentTimeMillis() + ttlMillis)) // 设置JWT的过期时间
                .signWith(SignatureAlgorithm.HS512, publicKey) // 使用密钥进行签名
                .compact(); // 生成JWT
    }
}
