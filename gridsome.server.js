// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require("axios");
module.exports = function(api) {
  api.loadSource(async ({ addCollection, addMetadata, addSchemaTypes }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api

    let WHOAMI_BLOG = process.env["WHOAMI_BLOG"];
    let API_ROOT = process.env["API_ROOT"] || 'https://api.whoami.dev/api/v1/blog/';

    // let fs = require("fs");
    // let request = require("request");
    // request(
    //   "http://res.cloudinary.com/ximg/image/upload/c_thumb,h_75,r_max,w_75/v1/whoami/63f3db41/image/YqqdgglrZYBF3vBo"
    // ).pipe(fs.createWriteStream("./src/favicon.png"));

    addSchemaTypes(`
    type WTag implements Node @infer {
      id: ID
      slug: String
      title: String
    }
    type Syndication{
       name: String
       displayName: String
       url: String
       commentsCount: Int
       likes: Int
    }
    type WPost implements Node @infer {
      syndication: [Syndication]
      title: String
      content: String
      coverImage: String
      excerpt: String
      publishDate: Date
      createdDate: Date
      path: String
      tags: [WTag]
    }
    type NestedMenuItem {
      name: String
      url: String
    }
    type MenuItem {
      name: String
      url: String
      nested: [NestedMenuItem]
    }
    type ActivityItem {
      category: String
      html: String
      integration: String
      timestamp: Date
    }
    type SocialMenuItem {
      url: String
      icon: String
      name: String
    }
    type Metadata @infer {
      name: String
      menuItems: [MenuItem]
      socialMenuItems: [SocialMenuItem]
      activityItems: [ActivityItem]
    }
 `);

    const { data: blogData } = await axios.get(
      `${API_ROOT}${WHOAMI_BLOG}`
    );
    const {
      data: { results: postsEntries }
    } = await axios.get(
      `${API_ROOT}${WHOAMI_BLOG}/posts`
    );
    const {
      data: { results: pageEntries }
    } = await axios.get(
      `${API_ROOT}${WHOAMI_BLOG}/pages`
    );
    const {
      data: { results: projectEntries }
    } = await axios.get(
      `${API_ROOT}${WHOAMI_BLOG}/projects`
    );
    let {
      data: { results: activityItems }
    } = await axios.get(
      `${API_ROOT}${WHOAMI_BLOG}/activity`
    );

    addMetadata("menuItems", blogData.menu_items);
    addMetadata("socialMenuItems", blogData.social_menu_items);
    addMetadata("name", blogData.name);
    addMetadata("image", blogData.image);
    addMetadata("about", blogData.about);
    addMetadata("slug", blogData.slug);

    addMetadata("activityItems", activityItems);

    const posts = addCollection({
      typeName: "WPost",
    });
    const pages = addCollection({
      typeName: "WPage",
    });

    const tags = addCollection({
      typeName: "WTag",
    });

    const projects = addCollection({
      typeName: "WProject",
    });
    posts.addReference("tags", "WTag");

    blogData.tags.forEach(tag => {
      tags.addNode({
        id: tag.slug,
        slug: tag.slug,
        path: tag.slug,
        title: tag.name
      });
    });
    postsEntries.forEach(postEntry => {
      posts.addNode({
        id: postEntry.slug,
        title: postEntry.title,
        slug: postEntry.slug,
        content: postEntry.content,
        excerpt: postEntry.excerpt,
        createdDate: new Date(postEntry.created_date),
        publishDate:  new Date(postEntry.publish_date),
        lastModifiedDate: new Date(postEntry.last_modified_date),
        coverImage: postEntry.cover_image,
        status: postEntry.status,
        wordcount: postEntry.wordcount,
        tags: postEntry.tags.map(tag => tag.slug),
        syndication: postEntry.syndication.map( s => {return {name: s.name, displayName: s.display_name,
          url: s.url, commentsCount: s.comments_count, likes: s.likes }})
      });
    });
    pageEntries.forEach(pageEntry => {
      pages.addNode({
        id: pageEntry.slug,
        title: pageEntry.title,
        slug: pageEntry.slug,
        content: pageEntry.content,
        createdDate: new Date(pageEntry.created_date),
        publishDate:  Date.parse(pageEntry.publish_date),
        lastModifiedDate: new Date(pageEntry.last_modified_date),
        status: pageEntry.status,
        wordcount: pageEntry.wordcount
      });
    });
    projectEntries.forEach(projectEntry => {
      projects.addNode({
        id: projectEntry.slug,
        name: projectEntry.name,
        integrationName: projectEntry.integration_name,
        slug: projectEntry.slug,
        externalReference: projectEntry.external_reference,
        html: projectEntry.html,
        url: projectEntry.url
      });
    });
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
  });
};
