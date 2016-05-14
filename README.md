# jquery-placeholder-by-clone
placeholder fix for older browsers like >ie9

Note jquery is mandatory for the plugin to work. 

Steps:
Include jquery
add the jquery-placeholder.js


Attaching a placeholder
$(selector).attachPlaceholder('placeholderstring', options)
options = {
  disable: true, //will only attach the placeholder only if the browser doesnot support the feature
  color:'#999 !default;' 
}


detaching a placeholder
$(selector).detachPlaceholder();
