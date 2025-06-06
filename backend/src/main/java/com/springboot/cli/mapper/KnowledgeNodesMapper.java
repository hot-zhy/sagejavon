package com.springboot.cli.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.springboot.cli.model.DO.KnowledgeNodesDO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface KnowledgeNodesMapper extends BaseMapper<KnowledgeNodesDO> {
}
