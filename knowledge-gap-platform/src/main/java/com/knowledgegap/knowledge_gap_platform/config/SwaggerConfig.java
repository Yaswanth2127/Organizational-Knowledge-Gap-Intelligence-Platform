package com.knowledgegap.knowledge_gap_platform.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI knowledgeGapOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Knowledge Gap Intelligence Platform API")
                        .version("1.0")
                        .description("REST APIs for Organizational Knowledge Gap Intelligence Platform")

                        .contact(new Contact()
                                .name("Megavarshini")
                                .email("knowledgegapintelligence@gmail.com"))

                        .license(new License()
                                .name("Apache 2.0")))

                .externalDocs(new ExternalDocumentation()
                        .description("Knowledge Gap Platform Documentation"));
    }
}