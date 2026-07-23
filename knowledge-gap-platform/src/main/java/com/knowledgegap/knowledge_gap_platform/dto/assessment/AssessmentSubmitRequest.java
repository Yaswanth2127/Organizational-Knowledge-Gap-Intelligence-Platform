package com.knowledgegap.knowledge_gap_platform.dto.assessment;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AssessmentSubmitRequest {
    @NotNull
    private Long assessmentId;

    @NotEmpty
    private List<QuestionAnswerRequest> answers;
}
