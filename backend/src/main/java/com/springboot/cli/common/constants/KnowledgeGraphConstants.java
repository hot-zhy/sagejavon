package com.springboot.cli.common.constants;

import com.springboot.cli.model.DO.KnowledgeNodesDO;
import com.springboot.cli.model.DO.KnowledgeEdgesDO;

import java.util.Arrays;
import java.util.List;

public class KnowledgeGraphConstants {

    public static final List<KnowledgeNodesDO> DEFAULT_NODES = Arrays.asList(
            new KnowledgeNodesDO("1", "Java Programming", 0, 0),
            new KnowledgeNodesDO("2", "OOP", 0, 0),
            new KnowledgeNodesDO("3", "Inheritance", 0, 0),
            new KnowledgeNodesDO("4", "Polymorphism", 0, 0),
            new KnowledgeNodesDO("5", "Encapsulation", 0, 0),
            new KnowledgeNodesDO("6", "Abstraction", 0, 0),
            new KnowledgeNodesDO("7", "Interfaces", 0, 0),
            new KnowledgeNodesDO("8", "Exception Handling", 0, 0),
            new KnowledgeNodesDO("9", "Collections Framework", 0, 0),
            new KnowledgeNodesDO("10", "Generics", 0, 0),
            new KnowledgeNodesDO("11", "Concurrency", 0, 0),
            new KnowledgeNodesDO("12", "Multithreading", 0, 0),
            new KnowledgeNodesDO("13", "Lambda Expressions", 0, 0),
            new KnowledgeNodesDO("14", "Streams", 0, 0),
            new KnowledgeNodesDO("15", "Optional Class", 0, 0),
            new KnowledgeNodesDO("16", "JVM", 0, 0),
            new KnowledgeNodesDO("17", "Garbage Collection", 0, 0),
            new KnowledgeNodesDO("18", "Singleton Pattern", 0, 0),
            new KnowledgeNodesDO("19", "Factory Pattern", 0, 0),
            new KnowledgeNodesDO("20", "File I/O", 0, 0),
            new KnowledgeNodesDO("21", "Unit Testing", 0, 0)
    );

    public static final List<KnowledgeEdgesDO> DEFAULT_EDGES = Arrays.asList(
            new KnowledgeEdgesDO("1", "2", "includes"),
            new KnowledgeEdgesDO("2", "3", "has"),
            new KnowledgeEdgesDO("2", "4", "supports"),
            new KnowledgeEdgesDO("2", "5", "supports"),
            new KnowledgeEdgesDO("2", "6", "supports"),
            new KnowledgeEdgesDO("2", "7", "has"),
            new KnowledgeEdgesDO("1", "8", "handles"),
            new KnowledgeEdgesDO("1", "9", "uses"),
            new KnowledgeEdgesDO("9", "10", "has"),
            new KnowledgeEdgesDO("10", "11", "supports"),
            new KnowledgeEdgesDO("11", "12", "includes"),
            new KnowledgeEdgesDO("13", "14", "transforms to"),
            new KnowledgeEdgesDO("14", "15", "enhances"),
            new KnowledgeEdgesDO("16", "17", "manages"),
            new KnowledgeEdgesDO("18", "19", "implements"),
            new KnowledgeEdgesDO("20", "21", "verifies")
    );
}

