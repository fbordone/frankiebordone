<!doctype html>
<html {!! get_language_attributes() !!}>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    {{-- Favicon --}}
    <link rel="apple-touch-icon" sizes="180x180" href="{{ home_url() }}/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ home_url() }}/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ home_url() }}/favicon-16x16.png">
    <link rel="manifest" href="{{ home_url() }}/site.webmanifest">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    @php wp_head() @endphp
  </head>

  <body>
    {{-- Root DOM node --}}
    <div id="root"></div>

    @php wp_footer() @endphp
  </body>
</html>
