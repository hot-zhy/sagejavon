package com.springboot.cli.model.VO;

import com.springboot.cli.model.DO.KnowledgeEdgesDO;
import com.springboot.cli.model.DO.KnowledgeNodesDO;
import lombok.Data;

import java.util.List;

/**
 * 前端展示用的学生知识图谱 VO
 */
@Data
public class StudentKnowledgeGraphVO {

    private String studentId;

    private List<KnowledgeNodesDO> nodes;

    private List<KnowledgeEdgesDO> edges;

}
