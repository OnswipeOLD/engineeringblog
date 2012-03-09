---
layout: page
title: Onswipe Engineering
tagline: The Onswipe Engineering blog.
---
{% include JB/setup %}

{% assign first_post = site.posts.first %}
<div id="post">
  <h1>{{ first_post.title }}</h1>
  <p class="meta">
    {{ first_post.date | date_to_long_string }} 
    {% if first_post.location %}{{ first_post.location }}{% endif %}
  </p>
  {{ first_post.content }}
</div>

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
