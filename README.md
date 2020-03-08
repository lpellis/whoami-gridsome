# WhoAmI.dev gridsome starter
This is the gridsome project for https://whoami.dev

## 1. Installation instructions

####1. Clone/Fork this repository and create a new site in Netlify using the following settings:

    Build command: npm run build
    Publish Directory: dist 

####2. Setup the following Environment variables:

    SITE_NAME: Your site name
    SITE_URL:  Homepage url of your site (without slash at end), eg https://loftie.com
    WHOAMI_BLOG: [the blog id from your account]
        
###3. Setup an automatic build hook
To have your site automatically deployed whenever an update is made, create a new Build hook in Netlify.
Copy the url and set it up under your account at whoami.dev (Settings->Custom Domain)

