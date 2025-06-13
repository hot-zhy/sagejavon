package com.springboot.cli.service;

import com.springboot.cli.model.DO.KnowledgeDO;

import com.springboot.cli.model.VO.exercise.KnowledgeVO;
import com.springboot.cli.model.VO.knowledge.KnowledgeGraphVO;

import java.util.List;

public interface KnowledgeGraphService {

    List<KnowledgeGraphVO> getKnowledgeGraph(String studentId);

    String update(String studentId, String query);
}
