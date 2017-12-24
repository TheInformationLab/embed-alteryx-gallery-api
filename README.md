Alteryx Gallery API Examples
=====================================
Created by [Andre de Vries](https://www.twitter.com/andre347_) (20th Dec 2017)

Embedding and running Alteryx workflows and apps in custom built websites. Requires an Alteryx Server with Gallery installed.

Take a look at the [Gallery API](https://gallery.alteryx.com/api-docs/) Documentation for the API endpoints. You need to download the API files (alteryxGalleryAPI.js & oauth-signature.min.js) that can be grabbed from the API documentation.

Embedding Workflows
----------------

[Read the blog](https://www.theinformationlab.co.uk/2017/12/21/use-alteryx-gallery-api-embed-apps-workflows/) on how to set this up.

Source code for embedding and running Alteryx Workflows in third party portals or websites. In this example I used 'Region' to generate a file that is filtered to only the region specified by the user of the analytic app.

![Gallery API](https://image.ibb.co/mczxVR/gallery_API.gif)

Website created with Bootstrap with no added CSS. jQuery is used to simplify the DOM manipulation.

Embedding Analytic Apps with questions
----------------

Source code for embedding and running Alteryx Analytic Apps with interface questions.

![Gallery API](https://image.ibb.co/j5jms6/app_run_api.gif)

Specify the question name in the interface tool.

![appQuestion](https://image.ibb.co/cqBczm/Screen_Shot_2017_12_21_at_12_25_41.png)

Embedding Analytic Apps with file upload
----------------
