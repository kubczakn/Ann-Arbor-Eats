package com.kubczakn.aarestaurants.posts;

import java.util.List;

public class PostResponse
{
    private Boolean status;
    private String message;
    private Iterable data;

    public PostResponse() {}

    public Boolean getStatus() {return this.status;}

    public void setStatus(Boolean status) {this.status = status;}

    public String getMessage() {return this.message;}

    public void setMessage(String message) {this.message = message;}

    public Iterable getData() {return this.data;}

    public void setData(Iterable data) {this.data = data;}

}
