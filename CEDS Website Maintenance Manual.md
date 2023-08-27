---
title: "Coastal Ecosystem Design Studio"
subtitle: "Website Maintenance Manual"
author: "Austin Franklin"
description: "This is the manual describing maintenance procedures for the CEDS website located at https://lsu.edu/ceds"
institute: "Louisiana State University"
date: "Last Updated 08/07/2023"
---

# Maintenance Manual

This is the manual for updating the CEDS website through the LSU Omni platform. The website is currently at [this URL](https://lsu.edu/_fierce-draft/_ceds/index.php).

The following pages on the CEDS website will need to be updated when new research, publications, tools, or other notable resources are completed and documented:
  - Research
  - Tools and Resources

Other pages, such as the people page will need to be updated less frequently when staff and research team members change. The documentation for maintenance is below. However, for some issues you may need to reach out to Lori Martin, Director of Digital Communications at **lkemp1@lsu.edu**.

# Table of Contents
  - [Omni Overview](#omni-overview)
    - [Navigating the Directory](#navigating-the-directory)
    - [Navigating the Index File](#navigating-the-index-file)
    - [Checking In and Out Pages](#checking-in-and-out-pages)
  - [Editing Pages](#editing-pages)
    - [About](#about-page)
    - [People](#people-page)
    - [Research](#research-page)
    - [Tools and Resources](#tools--resources-page)
  - [Styling and accessibility](#styling-and-accessibility)
  - [Glossary](#glossary-of-terms)

# Omni Overview

Omni is a CMS, or content management system. Rather than doing all of the programming for a site by yourself line-by-line, a CMS allows you to publicly host your files online using preset page items, called snippets. Most of the time spent editing the website will be done through interacting with or making changes to snippets. In order to navigate to a page, you will need to click "Back to Pages" or navigate using the "Home" icon in the tope left-hand corner of the screen. The folders for each page are located at _fierce_draft/_ceds, where the following should be visible:

<!-- photo -->
![Omni File Structure](/manual-photos/omni-structure.png)

## Navigating the Directory

Each *index.pcf* file, one of which is visible in the picture above, is an editable file. The index file in each folder corresponds with the website page for that folder, so the index.pcf file in the research folder is the editable file for the Research page. The index file in picture is in the root directory and corresponds to the landing page for the site. Simply click on the index file you want to edit to be taken to that page.

<!-- photo -->
![Main Omni Page](/manual-photos/omni-main.png)

## Navigating the Index File

The index files give you several options for that page. The tabs and buttons at the top of the screen have the following functions:
  - **Preview**: Shows the full page and how it will look on the site once published (since the last save).
  - **Edit**: Opens the page editor and allows you to add, delete, and move page information.
  - **Properties**: Gives you access to page properties and settings such as editable metadata, page descriptions, and tags for SEO.
  - **Versions**: Shows you a log of all saved edits to the site with the ability to restore any previously save version. The versions save automatically when you save each page but need to be restored manually. **Lori would be a good resource to use if you need to do this and need help!**
  - **Check In/Out**: Once an index file is opened in edit mode it is considered "checked out" by that user. Once it is checked out it is only accessible to that user and will need to be checked back in for others to use. This applies to all ITS and Digital Communications staff! They will not be able to troubleshoot a page if it is checked out by another user.
  - **Publish**: Publishing an updated page will share it with the world! **You will need to make sure to follow the accessibility guidelines outlined below!**

## Checking In and Out Pages

In order to check in a page, navigate to "My Dashboard" at the top of the screen and turn off the lightbulbs for each page you want to check in.

<!-- photo -->
![Omni Check in-out Procedure](/manual-photos/omni-check-out.png)

# Editing Pages



<!-- photo -->
![Editing Functions](/manual-photos/omni-edit.png)

## Adding Images
To add and image:
1. Navigate to the "images" folder.
2. If adding a photo to a specific page, also navigate to the folder for that page.
3. Click "UPLOAD", the "+ADD", and select the photo(s) you wish to add (Omni has a 1 mega-byte size limit. To save space, .jpg or .jpeg files are preferable).
4. Once all photos have been added, click "START UPLOAD".
5. Find the file in the folder where it was uploaded and publish it: ![Publish a Photo](/manual-photos/publish.png)

**WARNING: if you do not publish the photo then it will not be displayed on the webpage you add it to. This is a very important step!**

# About Page



# People Page

To edit People page information, click the 'Main Content' button to edit. In order to edit specific people pages you will need to find the individual page associated with that person in the People directory (*name_of_person*.pcf as opposed to index.pcf).

![Editing People](/manual-photos/people.png)

From here, enter the information as desired. Make sure the name and title of the person in their page matches the description on the main People page. To add a new person, copy another persons page from the people directory, rename the page, open it and change the information as desired. To add a new person to the main People page:
1. Click the 'Main Content' button to edit.
2. Scroll down and place your cursor in the spot where you would like to add a snippet. You may need to first create a [Fierce] 4 Columns snippet if adding a new row.
3. Add the photo in the desired column.
4. Add a [Fierce] Background Color snippet below the photo.
5. Set the background color to "white smoke gray" of #F4F4F4.
6. Add the name (24px - Heading 4), title (boldface), and a [Fierce] Button - Gold - Full Width snippet.
7. Link the persons page to the button by clicking on the button and using the Add Link button: ![Add Link](/manual-photos/add-link.png).

# Research Page

To edit information on the Research page:
1. Click the 'Main Content' button to edit.
2. Scroll down and place your cursor in the spot where you would like to add a snippet.
3. Click the add snippet button: ![Add Snippet](/manual-photos/snippet.png).
4. Search for either the [Fierce] Accordion or [Fierce] Accordion Section using the "Filter by name" search box depending on your needs (you will most likely use [Fierce] Accordion if you want to add a single project).
5. On the [Fierce] Accordion snippet, delete the "Another Heading" row by clicking on that row and selecting the "X" next to the row creation/deletion buttons (this is the X in the middle three buttons): ![Add and Delete Rows and Columns](/manual-photos/add-delete.png).
6. Your snippet should now look like this: ![Accordion](/manual-photos/accordion.png)
7. Enter your information. The heading text is what will show when the accordion is collapsed, while the content text will appear when the accordion is expanded. Additional snippets or photos can be nested inside this section.

# Tools & Resources Page

To edit Models on the Tools and Resources page:
1. Click the 'Main Content' button to edit.
2. Scroll down and place your cursor in the spot where you would like to add a snippet.
3. Click the add snippet button: ![Add Snippet](/manual-photos/snippet.png).
4. Search for either the [Fierce] Card Section Light using the "Filter by name" search box depending on your needs.
5. Your snippet should now look like this: ![Card Section Light](/manual-photos/card-light.png)
5. Enter your information. The Label and Another Label is the image that will display, while the text in the lower section will appear below the image.

To add an accordion to this section (see other cards):
1. place your cursor inside the content section of the newly created snippet.
2. Click the add snippet button: ![Add Snippet](/manual-photos/snippet.png).
3. Search for either the [Fierce] Accordion or [Fierce] Accordion Section using the "Filter by name" search box depending on your needs (you will most likely use [Fierce] Accordion if you want to add a single project).
4. On the [Fierce] Accordion snippet, delete the "Another Heading" row by clicking on that row and selecting the "X" next to the row creation/deletion buttons (this is the X in the middle three buttons): ![Add and Delete Rows and Columns](/manual-photos/add-delete.png).
5. Your snippet should now look like this: ![Accordion](/manual-photos/accordion.png)
6. Enter your information. The heading text is what will show when the accordion is collapsed, while the content text will appear when the accordion is expanded. Additional snippets or photos can be nested inside this section. 

To edit Academic Study and Analyses on the Tools and Resources page:



To edit Case Studies on the Tools and Resources page:
1. Click the 'Main Content' button to edit.
2. Scroll down and place your cursor in the spot where you would like to add a snippet.
3. Click the add snippet button: ![Add Snippet](/manual-photos/snippet.png).
4. Search for either the [Fierce] Accordion or [Fierce] Accordion Section using the "Filter by name" search box depending on your needs (you will most likely use [Fierce] Accordion if you want to add a single project).
5. On the [Fierce] Accordion snippet, delete the "Another Heading" row by clicking on that row and selecting the "X" next to the row creation/deletion buttons (this is the X in the middle three buttons): ![Add and Delete Rows and Columns](/manual-photos/add-delete.png).
6. Your snippet should now look like this: ![Accordion](/manual-photos/accordion.png)
7. Enter your information. The heading text is what will show when the accordion is collapsed, while the content text will appear when the accordion is expanded. Additional snippets or photos can be nested inside this section.
8. You may want to add an additional accordion inside the content section (see other case studies). To do this, place your cursor inside the content section of the newly created snippet, and then follow steps 3-7 again. 

To edit Publications on the Tools and Resources page:
1. Click the 'Main Content' button to edit.
2. Scroll down and place your cursor in the spot where you would like to add the document.
3. Enter the name of the publication as you would like it to appear on the page.
4. Add the PDF to the "PDFs" folder in the GitHub repo using GitHub pages or dragging and dropping it in the folder on your computer.
5. Push the changes.
6. Find that file in the repo online, copy the path, and add the path to the created text in Omni by clicking the Add Link button: ![Add Link](/manual-photos/add-link.png)

# Styling and Accessibility

In general, the style specifications for the site (outside of the deemed necessary for accessibility by ITS) are as follows:
- 18px size font for all text
- All text, except for headers, should be set to "Paragraph."
- Everything, even generic text should be written and displayed inside the [Fierce] 1 Column (with side margins) snippet. This will add a side margin to everything included inside.
- The alt or alternate description for all photos is required by Omni in order to meet accessibility standards. In general, I use the verbatim name of the person, project, model, or other. This has worked for me in most cases, but ITS will reach out if that condition is not satisfied. For example, the Hero Image alt description is "The Coastal Ecosystem Design Studio."


# Glossary of Terms

