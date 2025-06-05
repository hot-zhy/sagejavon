package com.springboot.cli.common;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Data
@Configuration
@Component
@ConfigurationProperties("app")
public class AppProperties {
    private String publicKey;
    private Long ttl;
    private String tokenName;
}

