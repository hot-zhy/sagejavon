package com.springboot.cli.model.DO;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("knowledge_edges")
public class KnowledgeEdgesDO {
    @TableId(type = IdType.AUTO)
    private Long id;

    private String studentId;
    private String fromNodeId;
    private String toNodeId;
    private String label;

    private LocalDateTime createTime;
    private LocalDateTime updateTime;

    public KnowledgeEdgesDO(String studentId, String fromNodeId, String toNodeId, String label, LocalDateTime createTime, LocalDateTime updateTime) {
        this.studentId = studentId;
        this.fromNodeId = fromNodeId;
        this.toNodeId = toNodeId;
        this.label = label;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public KnowledgeEdgesDO(String  from, String to, String label) {
        this.fromNodeId = from;
        this.toNodeId = to;
        this.label = label;
    }
}
