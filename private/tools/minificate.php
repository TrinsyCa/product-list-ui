<?php
function minify_html($buffer) {
    // Remove spaces between HTML tags
    $buffer = preg_replace('/>\s+</', '><', $buffer);

    // General HTML minification
    $search = [
        '/\>[^\S ]+/s',  // Remove spaces after tags
        '/[^\S ]+\</s',  // Remove spaces before tags
        '/(\s)+/s'       // Reduce multiple spaces
    ];

    $replace = [
        '>',
        '<',
        '\\1'
    ];

    // Apply minification
    $buffer = preg_replace($search, $replace, $buffer);

    // Minify inline scripts
    $buffer = preg_replace_callback(
        '#<script\b[^>]*>(.*?)<\/script>#is',
        function($matches) {
            if (strpos($matches[0], 'src=') !== false) {
                return $matches[0]; // Skip external scripts
            }
            $js_minified = minify_js($matches[1]);
            return "<script>{$js_minified}</script>";
        },
        $buffer
    );

    return $buffer;
}

function minify_js($js) {
    $search = [
        '/\s+/' // Remove extra spaces
    ];

    $replace = [
        ' ' // Single space
    ];

    $js = preg_replace($search, $replace, $js);
    $js = str_replace(["\r\n", "\r", "\n"], '', $js);

    return trim($js);
}

function minify_css($css) {
    $search = [
        '/\s+/',            // Remove extra spaces
        '/\/\*.*?\*\//s'    // Remove comments
    ];

    $replace = [
        ' ',
        ''
    ];

    $css = preg_replace($search, $replace, $css);
    $css = str_replace(["\r\n", "\r", "\n"], '', $css);

    return trim($css);
}