CREATE TABLE knowledge_nodes (
                                 id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                 student_id VARCHAR(64) NOT NULL,
                                 node_id VARCHAR(64) NOT NULL,
                                 text VARCHAR(255) NOT NULL,
                                 width INT DEFAULT 0,
                                 height INT DEFAULT 0,
                                 create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                 update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE knowledge_edges (
                                 id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                 student_id VARCHAR(64) NOT NULL,
                                 from_node_id VARCHAR(64) NOT NULL,
                                 to_node_id VARCHAR(64) NOT NULL,
                                 label VARCHAR(255),
                                 create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                 update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
