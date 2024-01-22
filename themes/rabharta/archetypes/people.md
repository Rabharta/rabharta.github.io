---
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
name: '{{ title }}'
constituency: ''
photo: ''
date: {{ .Date }}
draft: true
---