package com.springboot.cli.service.impl;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.springboot.cli.common.AppProperties;
import com.springboot.cli.common.constants.KnowledgeGraphConstants;
import com.springboot.cli.common.enums.OpExceptionEnum;
import com.springboot.cli.common.exception.OpException;
import com.springboot.cli.common.jwt.AuthStorage;
import com.springboot.cli.common.utils.JwtUtil;
import com.springboot.cli.model.DO.KnowledgeEdgesDO;
import com.springboot.cli.model.DO.KnowledgeNodesDO;
import com.springboot.cli.model.DO.StudentDO;
import com.springboot.cli.model.VO.StudentKnowledgeGraphVO;
import com.springboot.cli.model.VO.StudentVO;
import com.springboot.cli.repository.impl.KnowledgeEdgesRepository;
import com.springboot.cli.repository.impl.KnowledgeNodesRepository;
import com.springboot.cli.repository.impl.StudentRepository;
import com.springboot.cli.service.StudentService;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class StudentServiceImpl implements StudentService {

    @Resource
    StudentRepository studentRepository;
    @Resource
    KnowledgeEdgesRepository knowledgeEdgesRepository;
    @Resource
    KnowledgeNodesRepository knowledgeNodesRepository;
    @Autowired
    private AppProperties appProperties;

    @Override
    public StudentDO getStuInfo() {
        String studentId = AuthStorage.getUser().getUserId();
        LambdaQueryWrapper<StudentDO> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(StudentDO::getId, studentId);
        StudentDO student = studentRepository.getOne(queryWrapper);
        if(student == null) {
            //新建一条记录并保存
            StudentDO newStudent = StudentDO.builder().id(studentId).build();
            studentRepository.save(newStudent);
            student = newStudent;
        }
        return student;
    }

    @Override
    public void updateStuInfo(StudentDO student) {
        if(student == null) throw new OpException(OpExceptionEnum.ILLEGAL_ARGUMENT);
        //判断是否传了id
        String studentId = student.getId() == null ? AuthStorage.getUser().getUserId() : student.getId();
        student.setId(studentId);
        //根据id修改student
        studentRepository.updateById(student);
    }

    @Override
    public void registerStu(StudentDO studentDO) {
        StudentDO student = studentRepository.getOne(Wrappers.<StudentDO>lambdaQuery().eq(StudentDO::getPhone, studentDO.getPhone()), false);
        //1. 判断是否用户名重复
        if (student != null) {
            throw new OpException(OpExceptionEnum.ALREADY_REGISTER);
        }
        //2. 用户名长度检查
        if(studentDO.getNickname() != null && studentDO.getNickname().length()>10){
            throw new OpException(OpExceptionEnum.NICKNAME_LEN_ERROR);
        }

        String password = studentDO.getPassword();
        // 2. 密码长度检查
//        if (password.length() < 6 || password.length() > 20) {
//            throw new OpException(OpExceptionEnum.PASSWORD_LEN_ERROR);
//        }

        // 3. 密码必须包含字母和数字
//        if (!password.matches(".*[a-zA-Z].*") || !password.matches(".*\\d.*")) {
//            throw new OpException(OpExceptionEnum.PASSWORD_TYPE_ERROR);
//        }

        // 4. 创建用户
        String newPassword = DigestUtils.md5DigestAsHex(password.getBytes());
        studentDO.setId(UUID.randomUUID().toString().substring(0,23));  //随机id,保留前24位
        studentDO.setPassword(newPassword);  // 密码进行加密处理
        studentRepository.save(studentDO);

        // 👇 初始化知识图谱
        String studentId = studentDO.getId();
//        initKnowledgeGraphForStudent(studentId);
    }

    // 7. 初始化方法调用
    // 7. 初始化方法调用
    public void initKnowledgeGraphForStudent(String studentId) {
        // 初始化节点
        List<KnowledgeNodesDO> nodes = KnowledgeGraphConstants.DEFAULT_NODES.stream()
                .map(node -> {
                    KnowledgeNodesDO n = new KnowledgeNodesDO();
                    n.setStudentId(studentId);
                    n.setNodeId(String.valueOf(node.getId()));  // 知识点ID（图谱中的逻辑ID）
                    n.setText(node.getText());
                    n.setWidth(0);  // 初始化宽高为 0
                    n.setHeight(0);
                    n.setCreateTime(LocalDateTime.now());
                    n.setUpdateTime(LocalDateTime.now());
                    return n;
                })
                .toList();

        // 初始化边
        List<KnowledgeEdgesDO> edges = KnowledgeGraphConstants.DEFAULT_EDGES.stream()
                .map(edge -> {
                    KnowledgeEdgesDO e = new KnowledgeEdgesDO();
                    e.setStudentId(studentId);
                    e.setFromNodeId(edge.getFromNodeId()); // 起点逻辑ID
                    e.setToNodeId(edge.getToNodeId());     // 终点逻辑ID
                    e.setLabel(edge.getLabel());      // 连线标签
                    e.setCreateTime(LocalDateTime.now());
                    e.setUpdateTime(LocalDateTime.now());
                    return e;
                })
                .toList();

        // 批量保存
        knowledgeNodesRepository.saveBatch(nodes);
        knowledgeEdgesRepository.saveBatch(edges);
    }






    @Override
    public StudentVO login(StudentDO studentDO) {
        //判断登陆的用户是否注册过
        StudentDO student = studentRepository.getOne(Wrappers.<StudentDO>lambdaQuery().eq(StudentDO::getPhone, studentDO.getPhone()));
        //如果不存在，则需要注册
        if(student==null){
            throw new OpException(OpExceptionEnum.User_NOT_EXIST);
        }
        //若存在，则验证密码是否正确
        if(!student.getPassword().equals(DigestUtils.md5DigestAsHex(studentDO.getPassword().getBytes()))){
            throw new OpException(OpExceptionEnum.PASSWORD_ERROR);
        }
        // 用户登录成功，生成jwt令牌
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", student.getId());
        String token = JwtUtil.createJWT(appProperties.getPublicKey(), appProperties.getTtl(), claims);

        return StudentVO.builder().id(student.getId()).token(token).build();
    }

    @Override
    public StudentKnowledgeGraphVO getPersonalGraph(StudentDO studentDO) {
        String studentId = studentDO.getId().toString();

        // 查询该学生的所有节点
        LambdaQueryWrapper<KnowledgeNodesDO> nodeWrapper = new LambdaQueryWrapper<>();
        nodeWrapper.eq(KnowledgeNodesDO::getStudentId, studentId);
        List<KnowledgeNodesDO> nodes = knowledgeNodesRepository.list(nodeWrapper);

        // 查询该学生的所有边
        LambdaQueryWrapper<KnowledgeEdgesDO> edgeWrapper = new LambdaQueryWrapper<>();
        edgeWrapper.eq(KnowledgeEdgesDO::getStudentId, studentId);
        List<KnowledgeEdgesDO> edges = knowledgeEdgesRepository.list(edgeWrapper);

        // 封装 VO 返回
        StudentKnowledgeGraphVO vo = new StudentKnowledgeGraphVO();
        vo.setStudentId(studentId);
        vo.setNodes(nodes);
        vo.setEdges(edges);

        return vo;
    }


}
