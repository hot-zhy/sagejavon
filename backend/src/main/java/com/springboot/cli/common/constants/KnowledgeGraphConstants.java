package com.springboot.cli.common.constants;

import com.springboot.cli.model.DO.KnowledgeNodesDO;
import com.springboot.cli.model.DO.KnowledgeEdgesDO;

import java.util.Arrays;
import java.util.List;

public class KnowledgeGraphConstants {

    public static final List<KnowledgeNodesDO> DEFAULT_NODES = Arrays.asList(
            new KnowledgeNodesDO("1", "Java Programming", 140, 120),
            new KnowledgeNodesDO("2", "OOP", 140, 120),
            new KnowledgeNodesDO("3", "Inheritance", 140, 120),
            new KnowledgeNodesDO("4", "Polymorphism", 140, 120),
            new KnowledgeNodesDO("5", "Encapsulation", 140, 120),
            new KnowledgeNodesDO("6", "Abstraction", 140, 120),
            new KnowledgeNodesDO("7", "Interfaces", 140, 120),
            new KnowledgeNodesDO("8", "Abstract Classes", 140, 120),
            new KnowledgeNodesDO("9", "Exception Handling", 140, 120),
            new KnowledgeNodesDO("10", "Try-Catch", 140, 120),
            new KnowledgeNodesDO("11", "Finally Block", 140, 120),
            new KnowledgeNodesDO("12", "Throw vs Throws", 140, 120),
            new KnowledgeNodesDO("13", "Collections Framework", 140, 120),
            new KnowledgeNodesDO("14", "List", 140, 120),
            new KnowledgeNodesDO("15", "ArrayList", 140, 120),
            new KnowledgeNodesDO("16", "LinkedList", 140, 120),
            new KnowledgeNodesDO("17", "Set", 140, 120),
            new KnowledgeNodesDO("18", "HashSet", 140, 120),
            new KnowledgeNodesDO("19", "TreeSet", 140, 120),
            new KnowledgeNodesDO("20", "Map", 140, 120),
            new KnowledgeNodesDO("21", "HashMap", 140, 120),
            new KnowledgeNodesDO("22", "TreeMap", 140, 120),
            new KnowledgeNodesDO("23", "Generics", 140, 120),
            new KnowledgeNodesDO("24", "Wildcards", 140, 120),
            new KnowledgeNodesDO("25", "JVM", 140, 120),
            new KnowledgeNodesDO("26", "ClassLoader", 140, 120),
            new KnowledgeNodesDO("27", "Bytecode", 140, 120),
            new KnowledgeNodesDO("28", "Garbage Collection", 140, 120),
            new KnowledgeNodesDO("29", "JIT Compiler", 140, 120),
            new KnowledgeNodesDO("30", "Java Memory Model", 140, 120),
            new KnowledgeNodesDO("31", "Stack vs Heap", 140, 120),
            new KnowledgeNodesDO("32", "Concurrency", 140, 120),
            new KnowledgeNodesDO("33", "Thread", 140, 120),
            new KnowledgeNodesDO("34", "Runnable", 140, 120),
            new KnowledgeNodesDO("35", "synchronized", 140, 120),
            new KnowledgeNodesDO("36", "wait-notify", 140, 120),
            new KnowledgeNodesDO("37", "Lock Interface", 140, 120),
            new KnowledgeNodesDO("38", "Executors", 140, 120),
            new KnowledgeNodesDO("39", "Callable", 140, 120),
            new KnowledgeNodesDO("40", "Future", 140, 120),
            new KnowledgeNodesDO("41", "Atomic Variables", 140, 120),
            new KnowledgeNodesDO("42", "Volatile Keyword", 140, 120),
            new KnowledgeNodesDO("43", "Multithreading", 140, 120),
            new KnowledgeNodesDO("44", "Deadlock", 140, 120),
            new KnowledgeNodesDO("45", "Race Condition", 140, 120),
            new KnowledgeNodesDO("46", "Lambda Expressions", 140, 120),
            new KnowledgeNodesDO("47", "Streams", 140, 120),
            new KnowledgeNodesDO("48", "Collectors", 140, 120),
            new KnowledgeNodesDO("49", "Optional", 140, 120),
            new KnowledgeNodesDO("50", "Functional Interface", 140, 120),
            new KnowledgeNodesDO("51", "Predicate", 140, 120),
            new KnowledgeNodesDO("52", "Consumer", 140, 120),
            new KnowledgeNodesDO("53", "Supplier", 140, 120),
            new KnowledgeNodesDO("54", "Method Reference", 140, 120),
            new KnowledgeNodesDO("55", "File I/O", 140, 120),
            new KnowledgeNodesDO("56", "BufferedReader", 140, 120),
            new KnowledgeNodesDO("57", "BufferedWriter", 140, 120),
            new KnowledgeNodesDO("58", "Scanner", 140, 120),
            new KnowledgeNodesDO("59", "FileInputStream", 140, 120),
            new KnowledgeNodesDO("60", "NIO", 140, 120),
            new KnowledgeNodesDO("61", "Unit Testing", 140, 120),
            new KnowledgeNodesDO("62", "JUnit", 140, 120),
            new KnowledgeNodesDO("63", "Mockito", 140, 120),
            new KnowledgeNodesDO("64", "Test Coverage", 140, 120),
            new KnowledgeNodesDO("65", "Assertions", 140, 120),
            new KnowledgeNodesDO("66", "Design Patterns", 140, 120),
            new KnowledgeNodesDO("67", "Singleton", 140, 120),
            new KnowledgeNodesDO("68", "Factory", 140, 120),
            new KnowledgeNodesDO("69", "Observer", 140, 120),
            new KnowledgeNodesDO("70", "Strategy", 140, 120),
            new KnowledgeNodesDO("71", "Decorator", 140, 120),
            new KnowledgeNodesDO("72", "Builder", 140, 120),
            new KnowledgeNodesDO("73", "Prototype", 140, 120),
            new KnowledgeNodesDO("74", "Spring Framework", 140, 120),
            new KnowledgeNodesDO("75", "Spring Boot", 140, 120),
            new KnowledgeNodesDO("76", "Dependency Injection", 140, 120),
            new KnowledgeNodesDO("77", "IoC", 140, 120),
            new KnowledgeNodesDO("78", "AOP", 140, 120),
            new KnowledgeNodesDO("79", "Bean Scope", 140, 120),
            new KnowledgeNodesDO("80", "REST API", 140, 120),
            new KnowledgeNodesDO("81", "HTTP Methods", 140, 120),
            new KnowledgeNodesDO("82", "RequestMapping", 140, 120),
            new KnowledgeNodesDO("83", "ResponseEntity", 140, 120),
            new KnowledgeNodesDO("84", "Exception Handler", 140, 120),
            new KnowledgeNodesDO("85", "Security", 140, 120),
            new KnowledgeNodesDO("86", "JWT", 140, 120),
            new KnowledgeNodesDO("87", "OAuth2", 140, 120),
            new KnowledgeNodesDO("88", "Session", 140, 120),
            new KnowledgeNodesDO("89", "Cookie", 140, 120),
            new KnowledgeNodesDO("90", "Database", 140, 120),
            new KnowledgeNodesDO("91", "JDBC", 140, 120),
            new KnowledgeNodesDO("92", "JPA", 140, 120),
            new KnowledgeNodesDO("93", "Hibernate", 140, 120),
            new KnowledgeNodesDO("94", "Transaction", 140, 120),
            new KnowledgeNodesDO("95", "Entity", 140, 120),
            new KnowledgeNodesDO("96", "Repository", 140, 120),
            new KnowledgeNodesDO("97", "Service Layer", 140, 120),
            new KnowledgeNodesDO("98", "Controller", 140, 120)
    );



    public static final List<KnowledgeEdgesDO> DEFAULT_EDGES = Arrays.asList(
            // Java 基础结构
            new KnowledgeEdgesDO("1", "2", "includes"),
            new KnowledgeEdgesDO("1", "9", "includes"),
            new KnowledgeEdgesDO("1", "13", "includes"),
            new KnowledgeEdgesDO("1", "23", "includes"),
            new KnowledgeEdgesDO("1", "25", "runs on"),
            new KnowledgeEdgesDO("1", "32", "supports"),
            new KnowledgeEdgesDO("1", "46", "supports"),
            new KnowledgeEdgesDO("1", "55", "includes"),
            new KnowledgeEdgesDO("1", "61", "requires"),
            new KnowledgeEdgesDO("1", "66", "uses"),
            new KnowledgeEdgesDO("1", "74", "extends to"),

            // OOP 模块
            new KnowledgeEdgesDO("2", "3", "has"),
            new KnowledgeEdgesDO("2", "4", "supports"),
            new KnowledgeEdgesDO("2", "5", "has"),
            new KnowledgeEdgesDO("2", "6", "has"),
            new KnowledgeEdgesDO("2", "7", "uses"),
            new KnowledgeEdgesDO("2", "8", "uses"),

            // 异常处理
            new KnowledgeEdgesDO("9", "10", "uses"),
            new KnowledgeEdgesDO("10", "11", "includes"),
            new KnowledgeEdgesDO("9", "12", "explains"),

            // 集合框架
            new KnowledgeEdgesDO("13", "14", "includes"),
            new KnowledgeEdgesDO("14", "15", "is a"),
            new KnowledgeEdgesDO("14", "16", "is a"),
            new KnowledgeEdgesDO("13", "17", "includes"),
            new KnowledgeEdgesDO("17", "18", "is a"),
            new KnowledgeEdgesDO("17", "19", "is a"),
            new KnowledgeEdgesDO("13", "20", "includes"),
            new KnowledgeEdgesDO("20", "21", "is a"),
            new KnowledgeEdgesDO("20", "22", "is a"),

            // 泛型
            new KnowledgeEdgesDO("23", "24", "includes"),
            new KnowledgeEdgesDO("13", "23", "uses"),

            // JVM 相关
            new KnowledgeEdgesDO("25", "26", "uses"),
            new KnowledgeEdgesDO("25", "27", "runs"),
            new KnowledgeEdgesDO("25", "28", "manages"),
            new KnowledgeEdgesDO("25", "29", "optimizes"),
            new KnowledgeEdgesDO("25", "30", "includes"),
            new KnowledgeEdgesDO("30", "31", "explains"),

            // 并发模块
            new KnowledgeEdgesDO("32", "33", "uses"),
            new KnowledgeEdgesDO("33", "34", "implements"),
            new KnowledgeEdgesDO("32", "35", "uses"),
            new KnowledgeEdgesDO("32", "36", "uses"),
            new KnowledgeEdgesDO("32", "37", "uses"),
            new KnowledgeEdgesDO("32", "38", "uses"),
            new KnowledgeEdgesDO("38", "39", "uses"),
            new KnowledgeEdgesDO("38", "40", "returns"),
            new KnowledgeEdgesDO("32", "41", "uses"),
            new KnowledgeEdgesDO("32", "42", "uses"),
            new KnowledgeEdgesDO("32", "43", "supports"),
            new KnowledgeEdgesDO("43", "44", "may cause"),
            new KnowledgeEdgesDO("43", "45", "may cause"),

            // 函数式编程
            new KnowledgeEdgesDO("46", "50", "uses"),
            new KnowledgeEdgesDO("50", "51", "is a"),
            new KnowledgeEdgesDO("50", "52", "is a"),
            new KnowledgeEdgesDO("50", "53", "is a"),
            new KnowledgeEdgesDO("46", "54", "supports"),
            new KnowledgeEdgesDO("46", "47", "used in"),
            new KnowledgeEdgesDO("47", "48", "collects"),
            new KnowledgeEdgesDO("47", "49", "returns"),

            // I/O
            new KnowledgeEdgesDO("55", "56", "uses"),
            new KnowledgeEdgesDO("55", "57", "uses"),
            new KnowledgeEdgesDO("55", "58", "uses"),
            new KnowledgeEdgesDO("55", "59", "uses"),
            new KnowledgeEdgesDO("55", "60", "includes"),

            // 测试
            new KnowledgeEdgesDO("61", "62", "uses"),
            new KnowledgeEdgesDO("61", "63", "uses"),
            new KnowledgeEdgesDO("61", "64", "measures"),
            new KnowledgeEdgesDO("61", "65", "uses"),

            // 设计模式
            new KnowledgeEdgesDO("66", "67", "includes"),
            new KnowledgeEdgesDO("66", "68", "includes"),
            new KnowledgeEdgesDO("66", "69", "includes"),
            new KnowledgeEdgesDO("66", "70", "includes"),
            new KnowledgeEdgesDO("66", "71", "includes"),
            new KnowledgeEdgesDO("66", "72", "includes"),
            new KnowledgeEdgesDO("66", "73", "includes"),

            // Spring 框架
            new KnowledgeEdgesDO("74", "75", "includes"),
            new KnowledgeEdgesDO("74", "76", "uses"),
            new KnowledgeEdgesDO("74", "77", "supports"),
            new KnowledgeEdgesDO("74", "78", "supports"),
            new KnowledgeEdgesDO("74", "79", "configures"),
            new KnowledgeEdgesDO("75", "80", "supports"),
            new KnowledgeEdgesDO("80", "81", "uses"),
            new KnowledgeEdgesDO("80", "82", "uses"),
            new KnowledgeEdgesDO("80", "83", "returns"),
            new KnowledgeEdgesDO("80", "84", "uses"),

            // 安全
            new KnowledgeEdgesDO("85", "86", "uses"),
            new KnowledgeEdgesDO("85", "87", "uses"),
            new KnowledgeEdgesDO("85", "88", "manages"),
            new KnowledgeEdgesDO("85", "89", "manages"),

            // 数据库
            new KnowledgeEdgesDO("90", "91", "connects via"),
            new KnowledgeEdgesDO("90", "92", "maps via"),
            new KnowledgeEdgesDO("92", "93", "uses"),
            new KnowledgeEdgesDO("92", "94", "manages"),
            new KnowledgeEdgesDO("92", "95", "maps"),
            new KnowledgeEdgesDO("92", "96", "uses"),
            new KnowledgeEdgesDO("92", "97", "used in"),
            new KnowledgeEdgesDO("92", "98", "invoked by")
    );


}

