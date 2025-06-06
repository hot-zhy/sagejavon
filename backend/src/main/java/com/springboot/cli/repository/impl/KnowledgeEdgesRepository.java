package com.springboot.cli.repository.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.springboot.cli.mapper.KnowledgeEdgesMapper;
import com.springboot.cli.model.DO.KnowledgeEdgesDO;
import com.springboot.cli.repository.IKnowledgeEdgesRepo;
import org.springframework.stereotype.Service;

@Service
public class KnowledgeEdgesRepository extends ServiceImpl<KnowledgeEdgesMapper, KnowledgeEdgesDO>
        implements IKnowledgeEdgesRepo {
}
