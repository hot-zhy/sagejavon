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
@TableName("knowledge_nodes")
@AllArgsConstructor
@NoArgsConstructor
public class KnowledgeNodesDO {
    @TableId(type = IdType.AUTO)
    private Long id;

    private String studentId;
    private String nodeId;
    private String text;
    private Integer width;
    private Integer height;

    private LocalDateTime createTime;
    private LocalDateTime updateTime;

    public KnowledgeNodesDO(String nodeId, String text, int width, int height) {
        this.nodeId = nodeId;
        this.text = text;
        this.width = width;
        this.height = height;
    }

    public KnowledgeNodesDO(String studentId, String nodeId, String text, Integer width, Integer height, LocalDateTime createTime, LocalDateTime updateTime) {
        this.studentId = studentId;
        this.studentId = studentId;
        this.nodeId = nodeId;
        this.text = text;
        this.width = width;
        this.height = height;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}
