/**
 * @file
 * Autotag behavior.
 */

(function ($) {

  Drupal.behaviors.addAutoTag = {
    attach: function(context, settings) {
      if (context == document) {
        $('.autotag.form-text', context).each(function() {
          var id = $(this).attr('id') + '-autotag';

          $(this).after('<input type="submit" class="autotag-submit form-submit" value="Autotag" id="' + id + '" />');
        });

        $('.autotag-submit').click(function(){

          // Look for body field text.
          var search_text = '';
          var source_field = settings.autotag.source_field;

          // Look for Wysiwyg
          if (typeof(Drupal.wysiwyg) !== 'undefined' && typeof(Drupal.wysiwyg.instances['edit-' + source_field + '-und-0-value']) !== 'undefined') {
            search_text = Drupal.wysiwyg.instances['edit-' + source_field + '-und-0-value'].getContent();
          }
          else {
            search_text = $('#edit-' + source_field + '-und-0-value').text();
          }

          // Fetch terms for this field
          var id = $(this).attr('id').replace('-autotag', '');

          // Add throbber
          $(this).after('<span class="ajax-progress ajax-progress-throbber"></span>');

          var url = settings.basePath + 'autotag/' + settings.autotag.entity_type + '/' + settings.autotag.field_name + '/' + settings.autotag.bundle;

          $.ajax({
            url: url,
            type: 'POST',
            data: { search_text: search_text, current_terms: $('#' + id).val() },
            context: context
          })
          .done(function(data) {
            // Add terms to Autotag field
            $('#' + id).val(data).parent().find('.ajax-progress').remove();
          });

          return false;
        });
      }
    }
  };

})(jQuery);