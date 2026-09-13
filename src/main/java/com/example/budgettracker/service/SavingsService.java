package com.example.budgettracker.service;

import com.example.budgettracker.dto.SavingsRequest;
import com.example.budgettracker.dto.SavingsResponse;
import com.example.budgettracker.entity.Savings;
import com.example.budgettracker.entity.User;
import com.example.budgettracker.repository.SavingsRepository;
import com.example.budgettracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SavingsService {

    private final SavingsRepository savingRepository;
    private final UserRepository userRepository;

    public SavingsResponse createSaving(Long userId, SavingsRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Savings saving = new Savings();
        saving.setAmount(request.getAmount());
        saving.setDestination(request.getDestination());
        saving.setDestinationType(request.getDestinationType());
        saving.setNote(request.getNote());
        saving.setDate(request.getDate());
        saving.setUser(user);

        Savings savedSaving = savingRepository.save(saving);
        return convertToResponse(savedSaving);
    }

    public List<SavingsResponse> getUserSavings(Long userId) {
        return savingRepository.findByUserIdOrderByDateDesc(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public BigDecimal getTotalSavings(Long userId) {
        return savingRepository.getTotalSavingsByUser(userId);
    }

    public void deleteSaving(Long savingId) {
        savingRepository.deleteById(savingId);
    }

    private SavingsResponse convertToResponse(Savings saving) {
        return new SavingsResponse(
                saving.getId(),
                saving.getAmount(),
                saving.getDestination(),
                saving.getDestinationType(),
                saving.getNote(),
                saving.getDate(),
                saving.getUser().getId()
        );
    }
}