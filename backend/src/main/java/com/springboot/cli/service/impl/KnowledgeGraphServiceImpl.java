package com.springboot.cli.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.cli.common.constants.KnowledgeGraphConstants;
import com.springboot.cli.common.enums.OpExceptionEnum;
import com.springboot.cli.common.exception.OpException;
import com.springboot.cli.common.utils.ChatGLMClient;
import com.springboot.cli.model.DO.KnowledgeDO;
import com.springboot.cli.model.DO.KnowledgeEdgesDO;
import com.springboot.cli.model.DO.KnowledgeNodesDO;
import com.springboot.cli.model.VO.exercise.KnowledgeVO;
import com.springboot.cli.model.VO.knowledge.KnowledgeGraphVO;
import com.springboot.cli.repository.impl.ExerciseKnowledgeRepository;
import com.springboot.cli.repository.impl.KnowledgeEdgesRepository;
import com.springboot.cli.repository.impl.KnowledgeNodesRepository;
import com.springboot.cli.repository.impl.KnowledgeRepository;
import com.springboot.cli.service.KnowledgeGraphService;
import com.springboot.cli.service.KnowledgeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
@Slf4j
public class KnowledgeGraphServiceImpl implements KnowledgeGraphService {

    private final KnowledgeNodesRepository knowledgeNodesRepository;
    private final KnowledgeEdgesRepository knowledgeEdgesRepository;

    public KnowledgeGraphServiceImpl(KnowledgeNodesRepository knowledgeNodesRepository, KnowledgeEdgesRepository knowledgeEdgesRepository) {
        this.knowledgeNodesRepository = knowledgeNodesRepository;
        this.knowledgeEdgesRepository = knowledgeEdgesRepository;
    }

    @Override
    public List<KnowledgeGraphVO> getKnowledgeGraph(String studentId) {
        // 获取节点
        List<KnowledgeNodesDO> nodes = knowledgeNodesRepository.selectByStudentId(studentId);
        // 获取边
        List<KnowledgeEdgesDO> edges = knowledgeEdgesRepository.selectByStudentId(studentId);

        KnowledgeGraphVO vo = new KnowledgeGraphVO();
        vo.setRootId("1");

        List<KnowledgeGraphVO.Node> nodeList = nodes.stream().map(node -> {
            KnowledgeGraphVO.Node n = new KnowledgeGraphVO.Node();
            n.setId(String.valueOf(node.getNodeId()));
            n.setText(node.getText());
            n.setWidth(node.getWidth());
            n.setHeight(node.getHeight());
            return n;
        }).toList();

        List<KnowledgeGraphVO.Line> edgeList = edges.stream().map(edge -> {
            KnowledgeGraphVO.Line l = new KnowledgeGraphVO.Line();
            l.setFrom(String.valueOf(edge.getFromNodeId()));
            l.setTo(String.valueOf(edge.getToNodeId()));
            l.setText(edge.getLabel());
            return l;
        }).toList();

        vo.setNodes(nodeList);
        vo.setLines(edgeList);

        return List.of(vo);
    }

    @Override
    public String update(String studentId, String query) {
        // 1. 获取所有知识节点（假设从数据库查）
        List<KnowledgeNodesDO> nodes = knowledgeNodesRepository.selectByStudentId(studentId);

        // 2. 构造 ChatGLM 提问内容
        StringBuilder promptBuilder = new StringBuilder();
        promptBuilder.append("学生提问如下：").append(query).append("\n")
                .append("以下是所有知识点名称，请你从中挑出与问题最相关的若干个：\n");

        for (KnowledgeNodesDO node : nodes) {
            promptBuilder.append("- ").append(node.getText()).append("\n");
        }
        promptBuilder.append("请只返回涉及到的知识点名称列表，如：[\"OOP\", \"Generics\"]");

        // 3. 调用 ChatGLM
        String prompt = promptBuilder.toString();
        List<String> mentioned = ChatGLMClient.callChatGLM(prompt);

        // 4. 更新数据库中涉及的知识点
        for (KnowledgeNodesDO node : nodes) {
            if (mentioned.contains(node.getText())) {
                node.setWidth(node.getWidth() + 20);
                node.setHeight(node.getHeight() + 20);
                // 更新到数据库
                knowledgeNodesRepository.updateById(node);
            }
        }

        // 5. 返回处理后的节点结果（序列化为 JSON 字符串返回）
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(nodes);
        } catch (Exception e) {
            throw new RuntimeException("序列化失败", e);
        }
    }

}
