<!doctype html>
<html {!! get_language_attributes() !!}>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    @php wp_head() @endphp
  </head>

  <body>
    {{-- Root DOM node --}}
    <div id="root"></div>

    @php wp_footer() @endphp
  </body>
</html>
