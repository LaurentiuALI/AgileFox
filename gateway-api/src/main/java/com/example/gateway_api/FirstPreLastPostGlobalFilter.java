package com.example.gateway_api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class FirstPreLastPostGlobalFilter
        implements GlobalFilter, Ordered {

    final Logger logger = LoggerFactory.getLogger(FirstPreLastPostGlobalFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain){
        HttpHeaders requestHeaders = exchange.getRequest().getHeaders();
        logger.info("Agilefox request...");
        exchange = exchange.mutate().request(exchange.getRequest().mutate().header("CORRELATION_ID", "testing").build()).build();
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1;
    }
}