<?php
/**
 * @file
 *
 * Autotag API.
 */

/**
 * Autotag fetch terms.
 *
 * Modules will need to implement their own field settings (if needed)
 * to pair with this hook.
 *
 * @see autotag_form_field_ui_field_edit_form_alter()
 *
 * @param object $field_instance
 *   This contains the field instance object which will contain the settings
 *   that modules implementing this hook needs to act upon.
 * @param string $search_text
 *   This contains the search string that will be examined to look up terms
 *   against.
 *
 * @return array
 *   List of term names found.
 */
function hook_autotag_fetch_terms($field_instance, $search_text) {

}