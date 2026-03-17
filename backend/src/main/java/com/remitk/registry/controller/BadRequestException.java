package com.remitk.registry.controller;

public class BadRequestException extends Exception {
    public BadRequestException(String message) {
        super(message);
    }
}