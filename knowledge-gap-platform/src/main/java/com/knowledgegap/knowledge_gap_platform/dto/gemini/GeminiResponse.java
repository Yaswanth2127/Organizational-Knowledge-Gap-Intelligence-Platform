package com.knowledgegap.knowledge_gap_platform.dto.gemini;

import lombok.Data;

import java.util.List;

@Data
public class GeminiResponse {

    private List<Candidate> candidates;

    @Data
    public static class Candidate{
        private Content content;
        private String finishReason;
        private Integer index;
    }

    @Data
    public static class Content{
        private List<Part> parts;
        private String role;
    }

    @Data
    public static class Part{
        private String text;
    }

}
