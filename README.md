# jquery-placeholder-by-clone
placeholder fix for older browsers like >ie9

Note: jquery is mandatory for the plugin to work. 

Steps:

1. Include jquery

2. Add the jquery-placeholder.js library after jquery

Attaching a placeholder:-

$(selector).attachPlaceholder('placeholderstring', options);

options = {

  disable: true, //will only attach the placeholder only if the browser does not support the feature
  
  color:'#999 !default;' 
  
}


Detaching a placeholder:-

$(selector).detachPlaceholder();



Bower installation steps(work in-progress)

Incase of any issue, please let me know: contact.rahul1991@gmail.com
