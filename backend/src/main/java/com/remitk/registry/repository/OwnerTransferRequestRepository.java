package com.remitk.registry.repository;

import com.remitk.registry.model.OwnerTransferRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OwnerTransferRequestRepository extends JpaRepository<OwnerTransferRequest, Long> {
    List<OwnerTransferRequest> findAllByPetId(Long petId);
}
