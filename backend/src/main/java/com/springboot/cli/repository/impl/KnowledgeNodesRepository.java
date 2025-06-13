package com.springboot.cli.repository.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.springboot.cli.mapper.KnowledgeNodesMapper;
import com.springboot.cli.model.DO.KnowledgeNodesDO;
import com.springboot.cli.repository.IKnowledgeNodesRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KnowledgeNodesRepository extends ServiceImpl<KnowledgeNodesMapper, KnowledgeNodesDO>
        implements IKnowledgeNodesRepo {

    public List<KnowledgeNodesDO> selectByStudentId(String studentId) {
        return this.lambdaQuery()
                .eq(KnowledgeNodesDO::getStudentId, studentId)
                .list();
    }
}
