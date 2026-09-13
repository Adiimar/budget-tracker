package com.example.budgettracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavingsResponse {
    private Long id;
    private BigDecimal amount;
    private String destination;
    private String destinationType;
    private String note;
    private LocalDate date;
    private Long userId;
}