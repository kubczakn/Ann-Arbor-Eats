package com.kubczakn.aarestaurants.reviewers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
public class ReviewerController
{
    @Autowired
    ReviewerRepository repo;

    @Autowired
    protected AuthenticationManager authenticationManager;


    @PostMapping(path = "/account/create")
    public RedirectView createAccount(@RequestParam String username
        , @RequestParam String password
        , HttpServletRequest request
        ) {
        if (repo.existsByName(username)) {
           return new RedirectView("/create?error");
        }
        repo.save(new Reviewer(username, password, new String[]{"ROLE_REVIEWER"}));
        authWithAuthManager(request, username, password);
        return new RedirectView("/");
    }

    public void authWithAuthManager(HttpServletRequest request, String username, String password) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        authToken.setDetails(new WebAuthenticationDetails(request));
        Authentication authentication = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
