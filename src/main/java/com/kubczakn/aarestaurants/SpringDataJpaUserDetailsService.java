package com.kubczakn.aarestaurants;

import com.kubczakn.aarestaurants.reviewers.Reviewer;
import com.kubczakn.aarestaurants.reviewers.ReviewerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

// Bridge that allows Spring Security to look up users for security checks
@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService
{

    private final ReviewerRepository repository;

    @Autowired
    public SpringDataJpaUserDetailsService(ReviewerRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException
    {
        Reviewer reviewer = this.repository.findByName(name);
        return new User(reviewer.getName(), reviewer.getPassword(),
            AuthorityUtils.createAuthorityList(reviewer.getRoles()));
    }

}
