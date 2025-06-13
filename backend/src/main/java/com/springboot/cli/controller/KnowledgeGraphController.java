package com.springboot.cli.controller;

import com.springboot.cli.common.base.BaseResponse;
import com.springboot.cli.common.exception.OpException;
import com.springboot.cli.model.VO.knowledge.KnowledgeGraphVO;
import com.springboot.cli.service.KnowledgeGraphService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class KnowledgeGraphController {
    @Resource
    private KnowledgeGraphService knowledgeGraphService;

    @GetMapping("/graph")
    public BaseResponse<List<KnowledgeGraphVO>> getKnowledgeGraph(String studentId) {
        try {
            return BaseResponse.buildSuccess(knowledgeGraphService.getKnowledgeGraph(studentId));
        } catch (OpException e) {
            return BaseResponse.buildBizEx(e);
        } catch (Exception e) {
            return BaseResponse.buildSysEx(e);
        }
    }

    @PostMapping("/graph")
    public BaseResponse<String> update(@RequestBody String studentId, String query) {
        try {
            return BaseResponse.buildSuccess(knowledgeGraphService.update(studentId, query));
        } catch (OpException e) {
            return BaseResponse.buildBizEx(e);
        } catch (Exception e) {
            return BaseResponse.buildSysEx(e);
        }
    }
}
