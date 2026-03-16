package com.remitk.registry.service;

import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.Owner;
import org.springframework.stereotype.Service;

@Service
public class OwnerServiceImpl implements OwnerService{
    @Override
    public Owner createOwner(Owner owner) {
        return null;
    }

    @Override
    public Owner getOwnerById(Long id) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public Owner editOwner(Owner owner) throws ResourceNotFoundException {
        return null;
    }
}
