/**
 * @file
 * Autotag behavior.
 */

(function ($) {

  Drupal.behaviors.addAutoTag = {
    attach: function(context, settings) {
      $('.autotag.form-text', context).each(function() {
        var id = $(this).attr('id') + '-autotag';

        $(this).after('<input type="submit" class="autotag-submit" value="Autotag" id="' + id + '" />');
      });

      $('.autotag-submit').click(function(){

        // Look for body field text.
        // @todo support additional fields.
        var search_text = $('#edit-body-und-0-value').text();

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
  };

})(jQuery);