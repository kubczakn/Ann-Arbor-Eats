package com.kubczakn.aarestaurants.reviewers;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;

public interface ReviewerRepository extends CrudRepository<Reviewer, Long>
{
    Reviewer save(Reviewer reviewer);

    Reviewer findByName(String username);

    boolean existsByName(String username);
}
