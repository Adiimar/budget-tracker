package com.example.budgettracker.service;

import com.example.budgettracker.dto.ExpenseRequest;
import com.example.budgettracker.dto.ExpenseResponse;
import com.example.budgettracker.entity.Expense;
import com.example.budgettracker.entity.User;
import com.example.budgettracker.repository.ExpenseRepository;
import com.example.budgettracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    
    public ExpenseResponse createExpense(Long userId, ExpenseRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        
        Expense expense = new Expense();
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        expense.setUser(user);
        
        Expense savedExpense = expenseRepository.save(expense);
        return convertToResponse(savedExpense);
    }
    
    public List<ExpenseResponse> getUserExpenses(Long userId) {
        return expenseRepository.findByUserId(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public ExpenseResponse getExpenseById(Long expenseId) {
        Expense expense = expenseRepository.findById(expenseId).orElseThrow(() -> new RuntimeException("Expense not found"));
        return convertToResponse(expense);
    }
    
    public ExpenseResponse updateExpense(Long expenseId, ExpenseRequest request) {
        Expense expense = expenseRepository.findById(expenseId).orElseThrow(() -> new RuntimeException("Expense not found"));
        
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        
        Expense updatedExpense = expenseRepository.save(expense);
        return convertToResponse(updatedExpense);
    }
    
    public void deleteExpense(Long expenseId) {
        expenseRepository.deleteById(expenseId);
    }
    
    public List<ExpenseResponse> getExpensesByDateRange(Long userId, LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findByUserIdAndDateBetween(userId, startDate, endDate).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    private ExpenseResponse convertToResponse(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getDescription(),
                expense.getDate(),
                expense.getUser().getId()
        );
    }
}
