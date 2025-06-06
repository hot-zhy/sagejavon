package com.springboot.cli.common.config;

import com.springboot.cli.common.AppProperties;
import com.springboot.cli.common.jwt.AuthStorage;
import com.springboot.cli.common.jwt.JwtUser;
import com.springboot.cli.common.jwt.TokenProvider;
import com.xhpolaris.idlgen.basic.UserMeta;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@Component
public class AuthInterceptor implements HandlerInterceptor {

    private final AppProperties appProperties;

    public AuthInterceptor(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return true;
        }

        System.out.println("请求路径：" + request.getRequestURI());

        String token = request.getHeader(AuthStorage.TOKEN_KEY);  // 获取请求头中的 token
        System.out.println("接收到的 token: " + token);

        if (StringUtils.hasLength(token) && token.startsWith("Bearer ")) {
            token = token.substring(7); // 去掉 Bearer 前缀
        }

        if (StringUtils.hasLength(token)) {
            try {
                // 解码 token 并从中提取 userId 和 name
                Map<String, Object> tokenData = TokenProvider.decodeTokenToMap(token, appProperties.getPublicKey());
                System.out.println("token 解码内容: " + tokenData);

                String userId = (String) tokenData.get("userId");

                System.out.println("setUser in thread " + Thread.currentThread().getName() + " = " + userId);

                if (StringUtils.hasLength(userId)) {
                    JwtUser jwtUser = new JwtUser().setUserId(userId).setValid(true);
                    AuthStorage.setUser(token, jwtUser);
                    return true;  // 认证成功
                } else {
                    System.out.println("token 中缺少 userId");
                }

            } catch (Exception e) {
                System.out.println("token 解码失败：" + e.getMessage());
            }
        }

        // 如果 token 无效或没有提供，返回认证失败
        response.setContentType("application/json;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);  // 设置 401 状态码
        response.getWriter().write("{\"code\":401,\"msg\":\"请先登录或提供有效 token！\"}");
        return false;
    }


    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // 请求完成清除授权信息
        AuthStorage.clearUser();
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
