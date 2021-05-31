package com.kubczakn.aarestaurants.reviewers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class ReviewerDetailsService implements UserDetailsService
{
    private final ReviewerRepository repo;

    @Autowired
    public ReviewerDetailsService(ReviewerRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Reviewer reviewer = this.repo.findByName(name);
        return new User(reviewer.getName(), reviewer.getPassword(),
            AuthorityUtils.createAuthorityList(reviewer.getRoles()));
    }
}
