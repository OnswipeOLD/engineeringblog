---
layout: page
title: Onswipe Engineering
tagline: The Onswipe Engineering blog.
---
{% include JB/setup %}

{% assign first_post = site.posts.first %}
<div id="post">
  <h2 class="post-title"><a href="{{ first_post.url }}">{{ first_post.title }}</a></h2>
  <p class="meta">
    {{ first_post.date | date_to_long_string }} 
    {% if first_post.location %}{{ first_post.location }}{% endif %}
  </p>
  {{ first_post.content }}
</div>