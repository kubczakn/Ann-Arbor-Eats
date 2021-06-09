package com.kubczakn.aarestaurants;

import com.kubczakn.aarestaurants.reviewers.Reviewer;
import com.kubczakn.aarestaurants.reviewers.ReviewerDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter
{
    @Autowired
    private ReviewerDetailsService reviewerDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .userDetailsService(this.reviewerDetailsService)
            .passwordEncoder(Reviewer.PASSWORD_ENCODER);
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/built/**", "/main.css").permitAll()
                .antMatchers("/**").authenticated() // (3)
                .anyRequest().authenticated() // (4)
                .and()
            .formLogin() // (5)
//                .loginPage("/login") // (5)
                .defaultSuccessUrl("/", true)
                .permitAll()
                .and()
            .logout() // (6)
                .permitAll()
                .and()
            .httpBasic()
                .and()
            .csrf().disable();
//            .logout()
//                .logoutSuccessUrl("/"); // (7)
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
