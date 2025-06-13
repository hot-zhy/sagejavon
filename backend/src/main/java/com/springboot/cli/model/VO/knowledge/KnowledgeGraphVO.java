package com.springboot.cli.model.VO.knowledge;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KnowledgeGraphVO {
    private String rootId;
    private List<Node> nodes;
    private List<Line> lines;

    @Data
    public static class Node {
        private String id;
        private String text;
        private int width;
        private int height;
    }

    @Data
    public static class Line {
        private String from;
        private String to;
        private String text;
    }
}
