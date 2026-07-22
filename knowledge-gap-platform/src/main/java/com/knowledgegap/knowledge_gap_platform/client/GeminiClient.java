package com.knowledgegap.knowledge_gap_platform.client;


import com.knowledgegap.knowledge_gap_platform.config.GeminiConfig;
import com.knowledgegap.knowledge_gap_platform.dto.gemini.GeminiRequest;
import com.knowledgegap.knowledge_gap_platform.dto.gemini.GeminiResponse;
import com.knowledgegap.knowledge_gap_platform.exception.AIException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GeminiClient {
    private final GeminiConfig geminiConfig;
    private final RestClient restClient;



    public String testConnection() {

        return """
                API URL : %s
                MODEL   : %s
                API KEY : %s
                """.formatted(
                geminiConfig.getApiUrl(),
                geminiConfig.getModel(),
                geminiConfig.getApiKey().substring(0, 8) + "..."
        );
    }

    public String generateContent(String prompt){
        String url = String.format(
                "%s/%s:generateContent?key=%s",
                geminiConfig.getApiUrl(),
                geminiConfig.getModel(),
                geminiConfig.getApiKey()
        );

        GeminiRequest request=new GeminiRequest(List.of
                (new GeminiRequest.Content(List.of
                        (new GeminiRequest.Part(prompt)))));
        GeminiResponse response = null;

        for (int i = 0; true; i++) {
            try {
                response = restClient.post()
                        .uri(url)
                        .body(request)
                        .retrieve()
                        .body(GeminiResponse.class);

                break; // Success, exit the loop

            } catch (HttpServerErrorException.ServiceUnavailable ex) {

                if (i == 2) {
                    throw new AIException("Gemini service is temporarily unavailable. Please try again later.");
                }

                try {
                    Thread.sleep((i + 1) * 2000L); // Wait 2s, then 4s
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    throw new AIException("Retry interrupted.");
                }
            }
        }

        if(response==null ||
        response.getCandidates()==null ||
        response.getCandidates().isEmpty()||
        response.getCandidates().get(0).getContent()==null ||
        response.getCandidates().get(0).getContent().getParts()==null||
        response.getCandidates().get(0).getContent().getParts().isEmpty()){
            throw new AIException("No response received from the Gemini");

        }
       // System.out.println(response);
        return response.getCandidates()
                .get(0)
                .getContent()
                .getParts()
                .get(0)
                .getText();
    }
}

