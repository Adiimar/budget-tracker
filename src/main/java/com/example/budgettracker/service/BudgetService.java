package com.example.budgettracker.service;

import com.example.budgettracker.dto.BudgetRequest;
import com.example.budgettracker.dto.BudgetResponse;
import com.example.budgettracker.entity.Budget;
import com.example.budgettracker.entity.User;
import com.example.budgettracker.repository.BudgetRepository;
import com.example.budgettracker.repository.ExpenseRepository;
import com.example.budgettracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetService {
    
    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;
    private final ExpenseRepository expenseRepository;
    
    public BudgetResponse createBudget(Long userId, BudgetRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        
        Budget budget = new Budget();
        budget.setCategory(request.getCategory());
        budget.setLimitAmount(request.getLimitAmount());
        budget.setUser(user);
        
        Budget savedBudget = budgetRepository.save(budget);
        return convertToResponse(savedBudget, userId);
    }
    
    public List<BudgetResponse> getUserBudgets(Long userId) {
        return budgetRepository.findByUserId(userId).stream()
                .map(budget -> convertToResponse(budget, userId))
                .collect(Collectors.toList());
    }
    
    public BudgetResponse updateBudget(Long budgetId, BudgetRequest request) {
        Budget budget = budgetRepository.findById(budgetId).orElseThrow(() -> new RuntimeException("Budget not found"));
        
        budget.setCategory(request.getCategory());
        budget.setLimitAmount(request.getLimitAmount());
        
        Budget updatedBudget = budgetRepository.save(budget);
        return convertToResponse(updatedBudget, budget.getUser().getId());
    }
    
    public void deleteBudget(Long budgetId) {
        budgetRepository.deleteById(budgetId);
    }
    
    private BudgetResponse convertToResponse(Budget budget, Long userId) {
        LocalDate today = LocalDate.now();
        BigDecimal spent = expenseRepository.getSumByUserAndMonth(userId, today.getYear(), today.getMonthValue());
        spent = spent == null ? BigDecimal.ZERO : spent;
        
        return new BudgetResponse(
                budget.getId(),
                budget.getCategory(),
                budget.getLimitAmount(),
                spent,
                budget.getUser().getId()
        );
    }
}
