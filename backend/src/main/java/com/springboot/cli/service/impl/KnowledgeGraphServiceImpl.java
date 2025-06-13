package com.springboot.cli.service.impl;

import com.springboot.cli.common.enums.OpExceptionEnum;
import com.springboot.cli.common.exception.OpException;
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
}
