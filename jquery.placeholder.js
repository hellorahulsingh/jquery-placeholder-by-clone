/*
* jQuery.placeholder plugin for older browsers to fix placeholder problem
* Created by Rahul Singh [Email: contact.rahul1991@gmail.com]
* Open Source
* It works by simply creating a clone of the element and inserting just after the original element
* This works pretty well for the placeholder that doesnot appear in IE 9- & lower browsers browsers.
*/
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals: jQuery or jQuery-like library, such as Zepto
    factory(window.jQuery || window.$);
  }
}(function ($) {

  var defaults = {
    disable : true,
    color : '#999 !default'
  };

  $.fn.attachPlaceholder = function (placeholderText, options) {
    if (!this.length) {
      return this;
    }

    options = $.extend({}, defaults, options || {}); // if passed true, it will apply create a clone evenif the native browser supports placeholder

    if (!placeholderText) {
      placeholderText = this.attr('placeholder');
    }

    if (options && options.disable) {
      var does_input_support_placeholder = 'placeholder' in document.createElement('input');
      var does_textarea_support_placeholder = 'placeholder' in document.createElement('textarea');

      if (does_input_support_placeholder || does_textarea_support_placeholder) {
        this.attr('placeholder', placeholderText);
        return; //  if the native browser support placeholder, return from here
      }
    }

    if (this.data('original_element') > 0) { // if already created a cloned copy . Do not unnecessarily create a new clone for the element
      var element_refernce = this.data('original_element');
      this.parent().children().each(function(index, element) {
        var $element = $(element);
        if($element.data('cloned_element') == element_refernce) {
          $element.hide();
        }
      });
      this.show().focus();
      return;
    }

    var $_original_element = $(this);
    var currentTimeStamp = ((new Date()).getTime()).toString();
    $_original_element.data('original_element', currentTimeStamp);
    var $_cloned_element = $_original_element.clone(false); //  cloned copy

    $_original_element.after($_cloned_element); //  inserts the mirror element as its sibling

    if (placeholderText) {
      $_cloned_element.val(placeholderText).css({ color : options.color || '#999 !default;' });
    }
    $_cloned_element.removeAttr('id'); // remove id property to ensure duplicasy that may arise while fetching element using jQuery
    $_cloned_element.data('cloned_element', currentTimeStamp);

    //  attach focusin event on the original element
    $_cloned_element.bind('focus.clone_element', function() {
      $_original_element.show().focus();
      $_cloned_element.hide();
    });

    //  attach blur event on the cloned copy
    $_original_element.bind('blur.clone_element', function () {
      if ($_original_element.val().length === 0) {
        $_original_element.hide();
        $_cloned_element.show();
      }
    });

    function initialize () {
      if ($_original_element.val().length === 0) {
        $_cloned_element.show();
        $_original_element.hide();
      } else {
        $_cloned_element.hide();
        $_original_element.show();
      }
    }
    initialize(); //  intialize
  };

  $.fn.detachPlaceholder = function () {
    if (this.data('original_element') > 0) {
      var element_refernce = this.data('original_element');
      this.parent().children().each(function (index, element) {
        var $element = $(element);
        if ($element.data('cloned_element') === element_refernce) {
          $element.unbind('focus.clone_element');
          $element.remove();
        }
      });
      this.unbind('blur.clone_element');
    }
  };
}));
