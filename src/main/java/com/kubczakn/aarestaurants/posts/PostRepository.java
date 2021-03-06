package com.kubczakn.aarestaurants.posts;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

//@PreAuthorize("hasRole('ROLE_REVIEWER')")
public interface PostRepository extends PagingAndSortingRepository<Post, Long>
{
//    List<Post> findAllPage(Pageable pageable);

    // Only users that created a certain post can save, update, or delete a certain post
    @Override
    Post save(@Param("post") Post post);

    @Override
    @PreAuthorize("@postRepository.findById(#id)?.reviewer?.name == authentication?.name")
    void deleteById(@Param("id") Long id);

    @Override
    @PreAuthorize("#post?.reviewer?.name == authentication?.name")
    void delete(@Param("post") Post post);
}
