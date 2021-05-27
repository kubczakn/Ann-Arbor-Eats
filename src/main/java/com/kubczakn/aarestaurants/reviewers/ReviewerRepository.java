package com.kubczakn.aarestaurants.reviewers;

import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

// Don't need Crud repository since we just save and read data
// Need annotation because we don't want to export this for REST operations
@RepositoryRestResource(exported = false)
public interface ReviewerRepository
    extends Repository<Reviewer, Long>
{

    Reviewer save(Reviewer user);

    Reviewer findByName(String name);

}
