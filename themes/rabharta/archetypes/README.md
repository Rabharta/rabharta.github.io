## Archetypes

**IMPORTANT NOTE:** This directory contains archetypes which define content-creation rules for generating new content *via the Hugo CLI*.

We're using the DecapCMS to create content, which is a generic CMS that supports many SSGs (Hugo is just one SSG), so these Hugo-specific archetypes unfortunately don't get used by the CMS - CMS content creation rules are defined separately in the CMS config file.

So essentially the files in this directory are *mostly* useless. As long as they're kept in sync with the CMS config they should generate correctly strucutured content files if someone ever tries using Hugo CLI for content management (unlikely).
