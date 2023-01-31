package com.pazdev.guitarshop.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        //protect endpoint /api/orders
        httpSecurity.authorizeHttpRequests(configurer ->
                {
                    try {
                        configurer
                                .antMatchers(HttpMethod.POST, "/api/products/**")
                                .authenticated()
                                .antMatchers(HttpMethod.PUT, "/api/products/**")
                                .authenticated()
                                .antMatchers(HttpMethod.DELETE, "/api/products/**")
                                .authenticated();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                })
                .oauth2ResourceServer()
                .jwt();

        // add CORS filters
        httpSecurity.cors();

        // add content negotiation strategy
        httpSecurity.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        // force a non-empty response body for 401's to make the response more friendly
        Okta.configureResourceServer401ResponseBody(httpSecurity);

        return httpSecurity.build();
    }
}
