@extends('layouts.app')

@section('content')
  @while(have_posts()) @php the_post() @endphp
    <h1>{{ the_title() }}</h1>
    <p>{{ the_content() }}</p>
  @endwhile
@endsection
