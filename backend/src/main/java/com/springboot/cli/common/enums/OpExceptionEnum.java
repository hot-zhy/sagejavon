package com.springboot.cli.common.enums;

import com.springboot.cli.common.exception.OpResolve;
import lombok.AllArgsConstructor;
import lombok.Getter;

import static com.springboot.cli.common.enums.CommonResolveEnum.*;


/**
 * 此枚举用于构造OpException
 */
@AllArgsConstructor
@Getter
public enum OpExceptionEnum {
    ALREADY_REGISTER("ALREADY_REGISTER", "用户已注册，请直接登录", REGISTER_ALREADY),

    ILLEGAL_ARGUMENT("ILLEGAL_ARGUMENT", "非法参数", CHECK_ARGUMENT),

    EXECUTE_FAIL("EXECUTE_FAIL", "语句执行失败", CONTACT_RD),

    USER_ID_EMPTY("USER_ID_EMPTY", "用户ID为空", CHECK_ARGUMENT),

    LLM_ERROR("LLM_ERROR", "大模型错误", CONTACT_RD),

    JWT_ERROR("JWT_ERROR", "JWT解析错误", CONTACT_RD),

    REC_ERROR("REC_ERROR", "推荐系统错误", CONTACT_RD),

    NICKNAME_ERROR("NICKNAME_ERROR","用户名重复",CHECK_NAME),

    PASSWORD_LEN_ERROR("PASSWORD_LEN_ERROR","密码长度应在6-20位",CHECK_PASSWORD),

    PASSWORD_TYPE_ERROR("PASSWORD_TYPE_ERROR","密码必须包含数字和字母",CHECK_PASSWORD),

    PASSWORD_ERROR("PASSWORD_ERROR","密码输入错误",CHECK_PASSWORD),

    NICKNAME_LEN_ERROR("NICKNAME_LEN_ERROR","用户名长度不符合要求",CHECK_NAME),

    User_NOT_EXIST("User_NOT_EXIST","用户不存在",REGISTER_USER);

    final String code;
    final String message;
    final OpResolve resolve;
}
